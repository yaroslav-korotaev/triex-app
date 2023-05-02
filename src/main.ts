import {
  LogLevel,
  Log,
} from 'uberlog';
import {
  Format as LogFormat,
  FORMATS,
} from 'uberlog-format';
import Ajv from 'ajv';
import { paramCase } from 'param-case';
import minimist from 'minimist';
import {
  Builder,
  inject,
  create,
} from 'miniclee';
import { createRemote } from 'triex-remote';
import type { Context } from './types';
import { App } from './app';
import {
  launch,
  Schemas,
} from './utils';

export type Build<E> = (builder: Builder<Context>) => Builder<Context & E>;
export type Init<E> = (ctx: Context & E) => Promise<void>;

export function main<E>(build: Build<E>, init: Init<E>): void {
  const env: Record<string, string> = {};
  for (const key of Object.keys(process.env)) {
    env[paramCase(key)] = process.env[key]!;
  }
  const args = { ...env, ...minimist(process.argv.slice(2)) };
  
  const context = inject<Context>(args => {
    const logLevel = args['log-level'] as LogLevel || 'info';
    const logFormat = args['log-format'] as LogFormat || 'json';
    const log = new Log({
      level: logLevel,
      format: FORMATS[logFormat](),
      stream: process.stdout,
    });
    
    const ajv = new Ajv();
    const schemas = new Schemas({ ajv });
    const remote = createRemote();
    
    return {
      log,
      ajv,
      schemas,
      remote,
    };
  });
  
  const base = create()
    .plugin(context)
    .plugin({
      middleware: async (args, ctx, next) => {
        try {
          await next({});
        } catch (err) {
          ctx.log.fatal({ err: err as Error });
        }
      },
    })
  ;
  
  const app = build(base).main({
    handler: async (args, ctx) => {
      await init(ctx);
      
      const app = new App({
        log: ctx.log,
        host: args['host'] || 'localhost',
        port: parseInt(args['port'] || '3000', 10),
        remote: ctx.remote,
      });
      
      await launch(app, shutdown => {
        process.on('SIGINT', shutdown);
      });
    },
  });
  const exec = app.build();
  
  exec(args).catch(err => console.error(err));
}

import type { Log } from 'universe-types';
import type Koa from 'koa';
import compose from 'koa-compose';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import type { Route } from './types';

export interface CreateApiOptions {
  log: Log;
}

export function createApi(routes: Route[], options: CreateApiOptions): Koa.Middleware {
  const {
    log,
  } = options;
  
  const router = new Router();
  
  for (const route of routes) {
    router.register(route.path, [route.method], async ctx => {
      try {
        const response = await route.handler({
          koa: ctx,
          log,
          params: ctx.params,
          body: ctx.request.body,
        });
        
        ctx.body = response;
      } catch (err) {
        let error = err as Error;
        
        ctx.status = 500;
        ctx.body = {
          error: {
            ...error,
            message: error.message,
          },
        };
      }
      
      log.trace({
        request: {
          method: route.method,
          path: route.path,
          params: ctx.params,
          headers: ctx.request.headers,
          query: ctx.request.query,
          body: ctx.request.body,
        },
        response: {
          status: ctx.response.status,
          body: ctx.response.body,
        },
      });
    });
  }
  
  return compose([
    bodyparser({
      enableTypes: ['json'],
      jsonLimit: '10mb',
      strict: true,
    }),
    router.routes(),
  ]) as Koa.Middleware;
}

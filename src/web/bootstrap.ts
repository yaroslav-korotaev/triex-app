import type { RequestListener } from 'http';
import type { Log } from 'universe-types';
import Koa from 'koa';
import mount from 'koa-mount';
import type { Remote } from 'triex-remote';
import { createApi } from '../koa-api';
import { createRoutes } from './api/v1';

export interface BootstrapOptions {
  log: Log;
  remote: Remote;
}

export function bootstrap(options: BootstrapOptions): RequestListener {
  const {
    log,
    remote,
  } = options;
  
  const koa = new Koa();
  koa.on('error', err => {
    log.error({ err }, 'request handling error');
  });
  
  const routes = createRoutes({ remote });
  const api = createApi(routes, { log });
  
  koa.use(mount('/api/v1', api));
  
  return koa.callback();
}

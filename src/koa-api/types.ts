import type { Log } from 'universe-types';
import type Koa from 'koa';

export type Context = {
  koa: Koa.Context;
  log: Log;
  params: Record<string, string>;
  body: any;
};

export type Handler = (ctx: Context) => Promise<any>;

export type Route = {
  method: string;
  path: string;
  handler: Handler;
};

import type { Remote } from 'triex-remote';
import type { Route } from '../../../koa-api';

export type Options = {
  remote: Remote;
};

export type CreateRoute = (options: Options) => Route;

export function route(create: CreateRoute): CreateRoute {
  return create;
}

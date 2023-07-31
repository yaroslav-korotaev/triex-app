import type { Route } from '../../../koa-api';
import type { Options } from './route';
import { index } from './index-route';
import { execute as blueprintExecute } from './blueprints/execute';
import { blockPull } from './blocks/pull';
import { blockProcess } from './blocks/process';

export function createRoutes(options: Options): Route[] {
  return [
    index,
    blueprintExecute,
    blockPull,
    blockProcess,
  ].map(create => create(options));
}

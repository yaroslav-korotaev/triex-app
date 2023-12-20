import type { Route } from '../../../koa-api';
import type { Options } from './route';
import { index } from './index-route';
import { transform as blueprintTransform } from './blueprints/transform';
import { view as blueprintView } from './blueprints/view';
import { blockPull } from './blocks/pull';
import { blockProcess } from './blocks/process';

export function createRoutes(options: Options): Route[] {
  return [
    index,
    blueprintTransform,
    blueprintView,
    blockPull,
    blockProcess,
  ].map(create => create(options));
}

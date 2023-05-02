import type { Route } from '../../../koa-api';
import type { Options } from './route';
import { index } from './index-route';
import { paramsSchema as streamsParamsSchema } from './streams/params-schema';
import { enumerate as streamsEnumerate } from './streams/enumerate';
import { process as streamsProcess } from './streams/process';

export function createRoutes(options: Options): Route[] {
  return [
    index,
    streamsParamsSchema,
    streamsEnumerate,
    streamsProcess,
  ].map(create => create(options));
}
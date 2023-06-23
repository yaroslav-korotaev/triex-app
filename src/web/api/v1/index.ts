import type { Route } from '../../../koa-api';
import type { Options } from './route';
import { index } from './index-route';
import { execute as blueprintExecute } from './blueprints/execute';
import { paramsSchema as streamsParamsSchema } from './streams/params-schema';
import { enumerate as streamsEnumerate } from './streams/enumerate';
import { process as streamsProcess } from './streams/process';
import { exec as functionsExec } from './functions/exec';

export function createRoutes(options: Options): Route[] {
  return [
    index,
    blueprintExecute,
    streamsParamsSchema,
    streamsEnumerate,
    streamsProcess,
    functionsExec,
  ].map(create => create(options));
}

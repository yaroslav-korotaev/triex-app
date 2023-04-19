import type { Route } from '../../../koa-api';
import type { Options } from './route';
import { index } from './index-route';
import { params as streamsParams } from './streams/params';
import { hints as streamsHints } from './streams/hints';
import { output as streamsOutput } from './streams/output';
import { process as streamsProcess } from './streams/process';

export function createRoutes(options: Options): Route[] {
  return [
    index,
    streamsParams,
    streamsHints,
    streamsOutput,
    streamsProcess,
  ].map(create => create(options));
}

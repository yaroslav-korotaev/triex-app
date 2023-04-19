import type { Log } from 'universe-types';
import type Ajv from 'ajv';
import type { Remote } from 'triex-remote';
import type { Schemas } from './utils';

export type Context = {
  log: Log;
  ajv: Ajv;
  schemas: Schemas;
  remote: Remote;
};

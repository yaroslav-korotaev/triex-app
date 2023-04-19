import type { Module } from 'hurp';
import type Ajv from 'ajv';
import type {
  Schema,
  SchemaIs,
} from 'triex-types';

export async function anyway<T>(
  callback: () => Promise<T>,
  cleanup: () => Promise<void>,
): Promise<T> {
  let result: T;
  
  try {
    result = await callback();
  } catch (err) {
    await cleanup();
    
    throw err;
  }
  
  await cleanup();
  
  return result;
}

export async function summon<T extends Module>(
  module: T,
  callback: (module: T) => Promise<void>,
): Promise<void> {
  await module.init();
  
  await anyway(async () => {
    await callback(module);
  }, async () => {
    await module.destroy();
  });
}

export async function launch(module: Module, wait: (shutdown: () => void) => void): Promise<void> {
  await module.init();
  await new Promise((resolve, reject) => {
    wait(() => {
      module.destroy()
        .then(resolve)
        .catch(reject)
      ;
    });
  });
}

export type SchemasOptions = {
  ajv: Ajv;
};

export class Schemas {
  public ajv: Ajv;
  
  constructor(options: SchemasOptions) {
    const {
      ajv,
    } = options;
    
    this.ajv = ajv;
  }
  
  public is<T>(schema: Schema): SchemaIs<T> {
    const validate = this.ajv.compile<T>(schema);
    const fn: SchemaIs<T> = (value: any): value is T => {
      const ok = validate(value);
      
      return ok;
    };
    fn.schema = schema;
    
    return fn;
  }
}

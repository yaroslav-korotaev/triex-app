import { route } from '../route';

export const execute = route(options => ({
  method: 'POST',
  path: '/blueprints/:blueprint/execute',
  handler: async ctx => {
    const blueprint = options.remote.blueprint.get(ctx.params['blueprint']);
    if (!blueprint) {
      throw new Error('blueprint not found');
    }
    
    return await blueprint.execute(ctx.body);
  },
}));

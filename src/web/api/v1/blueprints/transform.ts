import { route } from '../route';

export const transform = route(options => ({
  method: 'POST',
  path: '/blueprints/:blueprint/transform',
  handler: async ctx => {
    const blueprint = options.remote.blueprint.get(ctx.params['blueprint']);
    if (!blueprint) {
      throw new Error('blueprint not found');
    }
    
    return await blueprint.transform(ctx.body);
  },
}));

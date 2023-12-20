import { route } from '../route';

export const view = route(options => ({
  method: 'POST',
  path: '/blueprints/:blueprint/view',
  handler: async ctx => {
    const blueprint = options.remote.blueprint.get(ctx.params['blueprint']);
    if (!blueprint) {
      throw new Error('blueprint not found');
    }
    
    return await blueprint.view(ctx.body);
  },
}));

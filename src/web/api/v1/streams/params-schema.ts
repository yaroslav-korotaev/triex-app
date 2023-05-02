import { route } from '../route';

export const paramsSchema = route(options => ({
  method: 'POST',
  path: '/streams/:stream/params/schema',
  handler: async ctx => {
    const stream = options.remote.stream.get(ctx.params['stream']);
    if (!stream) {
      throw new Error('stream not found');
    }
    
    return stream.paramsSchema(ctx.body);
  },
}));

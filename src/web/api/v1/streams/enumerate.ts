import { route } from '../route';

export const enumerate = route(options => ({
  method: 'POST',
  path: '/streams/:stream/enumerate',
  handler: async ctx => {
    const stream = options.remote.stream.get(ctx.params['stream']);
    if (!stream) {
      throw new Error('stream not found');
    }
    
    return await stream.enumerate(ctx.body);
  },
}));

import { route } from '../route';

export const hints = route(options => ({
  method: 'post',
  path: '/streams/:stream/hints',
  handler: async ctx => {
    const stream = options.remote.stream.get(ctx.params['stream']);
    if (!stream) {
      throw new Error('stream not found');
    }
    
    return await stream.hints(ctx.body)
  },
}));

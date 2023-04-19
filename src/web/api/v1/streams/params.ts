import { route } from '../route';

export const params = route(options => ({
  method: 'get',
  path: '/streams/:stream/params',
  handler: async ctx => {
    const stream = options.remote.stream.get(ctx.params['stream']);
    if (!stream) {
      throw new Error('stream not found');
    }
    
    return stream.params();
  },
}));

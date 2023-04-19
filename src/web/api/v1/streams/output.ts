import { route } from '../route';

export const output = route(options => ({
  method: 'post',
  path: '/streams/:stream/output',
  handler: async ctx => {
    const stream = options.remote.stream.get(ctx.params['stream']);
    if (!stream) {
      throw new Error('stream not found');
    }
    
    return await stream.output(ctx.body)
  },
}));

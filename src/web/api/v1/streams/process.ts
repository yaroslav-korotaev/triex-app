import { route } from '../route';

export const process = route(options => ({
  method: 'post',
  path: '/streams/:stream/process',
  handler: async ctx => {
    const stream = options.remote.stream.get(ctx.params['stream']);
    if (!stream) {
      throw new Error('stream not found');
    }
    
    return await stream.process(ctx.body);
  },
}));

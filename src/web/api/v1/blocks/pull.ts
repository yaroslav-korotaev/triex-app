import { route } from '../route';

export const blockPull = route(options => ({
  method: 'POST',
  path: '/blocks/:block/pull',
  handler: async ctx => {
    const block = options.remote.block.get(ctx.params['block']);
    if (!block) {
      throw new Error('block not found');
    }
    
    return await block.pull(ctx.body);
  },
}));

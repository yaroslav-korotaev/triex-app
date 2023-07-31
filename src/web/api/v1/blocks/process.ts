import { route } from '../route';

export const blockProcess = route(options => ({
  method: 'POST',
  path: '/blocks/:block/process',
  handler: async ctx => {
    const block = options.remote.block.get(ctx.params['block']);
    if (!block) {
      throw new Error('block not found');
    }
    
    return await block.process(ctx.body);
  },
}));

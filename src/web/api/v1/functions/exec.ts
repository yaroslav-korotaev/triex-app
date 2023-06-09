import { route } from '../route';

export const exec = route(options => ({
  method: 'POST',
  path: '/functions/:func/exec',
  handler: async ctx => {
    const func = options.remote.func.get(ctx.params['func']);
    if (!func) {
      throw new Error('function not found');
    }
    
    return await func.exec(ctx.body);
  },
}));

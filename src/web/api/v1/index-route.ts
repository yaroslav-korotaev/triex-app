import { route } from './route';

export const index = route(options => ({
  method: 'get',
  path: '/index',
  handler: async ctx => {
    return options.remote.index();
  },
}));

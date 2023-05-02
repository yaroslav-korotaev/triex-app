import { route } from './route';

export const index = route(options => ({
  method: 'GET',
  path: '/index',
  handler: async ctx => {
    return options.remote.index();
  },
}));

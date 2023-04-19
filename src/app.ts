import type { Log } from 'universe-types';
import { Hurp } from 'hurp';
import HttpServer from 'hurp-http-server';
import type { Remote } from 'triex-remote';
import { bootstrap } from './web';

export interface AppOptions {
  log: Log;
  host: string;
  port: number;
  remote: Remote;
}

export class App extends Hurp {
  public constructor(options: AppOptions) {
    super();
    
    const {
      log,
      host,
      port,
      remote,
    } = options;
    
    const httpServer = new HttpServer({
      log,
      handler: bootstrap({
        log,
        remote,
      }),
      listen: {
        host,
        port,
      },
    });
    this.use(httpServer);
  }
}

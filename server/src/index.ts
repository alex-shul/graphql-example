import * as os from 'os';

const numCPUs = os.cpus().length;
import * as cluster from 'cluster';

import { startServer } from './startServer';
import { logger } from '../common/logger';

(() => {
  const clusterMaxNodes = +(process.env.CLUSTER_MAX_NODES || '1');
  if (clusterMaxNodes > 1) {
    if (cluster.isMaster) {
      logger.message(`Master ${process.pid} is running`);

      const maxChildThreadsCount = (clusterMaxNodes < numCPUs)
        ? clusterMaxNodes
        : numCPUs;

      for (let i = 0; i < maxChildThreadsCount; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        logger.message(`worker ${worker.process.pid} died (${signal || code}). restarting...`);
        cluster.fork();
      });
    } else {
      startServer();
      logger.message(`Worker ${process.pid} started`);
    }
  } else {
    logger.message(`Single thread ${process.pid} is running`);

    startServer();
  }
})();

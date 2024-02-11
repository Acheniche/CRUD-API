import { cpus } from 'os';
import cluster, { Worker } from 'cluster';
import { User } from './user.js';

if(cluster.isPrimary) {
    const arr: Worker[] = [];
    let mainData: User[] = [];
    cpus().forEach(() => {
        const forks = cluster.fork();
        arr.push(forks);
        forks.on('message', (newData) => {
            mainData = newData;
            arr.forEach((forks) => {
                forks.send(mainData);
            })
        })
    })
}
if (cluster.isWorker) {
    import('./index');
  }
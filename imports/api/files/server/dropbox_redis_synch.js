import Dropbox from 'dropbox';
import redis from 'redis';

import RedisReadyFile from './redis_ready_file';

const DropboxRedisSynch = (() => {
  const publicApi = {};
  const privateApi = {};

  /* Public */

  // Pull all content files from dropbox, pushing them into redis
  publicApi.run = () => {
    privateApi.pullFromDropboxSendToRedis();
  };

  /* Private */

  // Load dropbox content files including content, converting them into
  // redis ready files, then send them to redis
  privateApi.pullFromDropboxSendToRedis = () => {
    const dropboxApi = new Dropbox({
      accessToken: process.env.DROPBOX_TOKEN,
    });
    const redisClient = redis.createClient(process.env.REDIS_URL);

    dropboxApi.filesListFolder({ path: '' }).then((response) => {
      if (response && response.entries) {
        response.entries.forEach((entry) => {
          dropboxApi.filesDownload({ path: entry.path_display }).then((file) => {
            const redisReadyFile = Object.create(RedisReadyFile);
            redisReadyFile.init(file);
            redisClient.hmset(
              redisReadyFile.dbFilename,
              redisReadyFile.getHash(),
            );
          });
        });
      }
    }).catch((error) => {
      // TODO - for now ...
      console.log(error);
    });
  };

  return publicApi;
})();

export default DropboxRedisSynch;

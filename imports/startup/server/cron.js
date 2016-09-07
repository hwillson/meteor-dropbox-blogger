import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';

import DropboxRedisSynch from '../../api/files/server/dropbox_redis_synch';

// Always run once when the server first starts
DropboxRedisSynch.run();

if (Meteor.settings.private.cronEnabled) {
  SyncedCron.add({
    name: 'Dropbox -> Redis Synch',
    schedule(parser) {
      return parser.text('every 5 minutes');
    },
    job() {
      DropboxRedisSynch.run();
    },
  });
  SyncedCron.start();
}

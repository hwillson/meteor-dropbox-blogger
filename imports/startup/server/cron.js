import { Meteor } from 'meteor/meteor';
import { CronJob } from 'cron';
import DropboxRedisSynch from '../../api/files/server/dropbox_redis_synch';

// Always run once when the server first starts
DropboxRedisSynch.run();

if (Meteor.settings.private.cron.enabled) {
  const job = new CronJob(Meteor.settings.private.cron.schedule, () => {
    DropboxRedisSynch.run();
  }, null, false, 'America/Los_Angeles');
  job.start();
}

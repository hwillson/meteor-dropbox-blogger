/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import Dropbox from 'dropbox';
import s from 'underscore.string';

const COLLECTION_NAME = 'files';

Meteor.publish('files.all', function filesAll() {
  if (!process.env.DROPBOX_TOKEN) {
    throw new Error(
      'Uh oh - the DROPBOX_TOKEN environment variable is missing!');
  }

  const dropboxApi = new Dropbox({
    accessToken: process.env.DROPBOX_TOKEN,
  });

  const publishedKeys = {};

  const poll = () => {
    dropboxApi.filesListFolder({ path: '' }).then((response) => {
      if (response && response.entries) {
        response.entries.forEach((entry) => {
          dropboxApi.filesDownload({ path: entry.path_display }).then((file) => {
            const filenameParts = file.name.split('__');
            let order = 0;
            let filename;
            if (filenameParts.length === 2) {
              order = filenameParts[0];
              filename = filenameParts[1];
            } else {
              filename = filenameParts[0];
            }
            const fileTitle = filename.split('.')[0];
            const title = fileTitle.replace('_', ' ');
            let slug = s(fileTitle.toLowerCase()).dasherize().value();
            if (slug.charAt(0) === '-') {
              slug = slug.substring(1);
            }
            slug = slug.replace('?', '');
            const hidden = file.name.startsWith('_');
            const fileContent = {
              title,
              order,
              slug,
              content: file.fileBinary,
              hidden,
            };
            if (publishedKeys[file.id]) {
              this.changed(COLLECTION_NAME, file.id, fileContent);
            } else {
              publishedKeys[file.id] = true;
              this.added(COLLECTION_NAME, file.id, fileContent);
            }
          });
        });
      }
    }).catch((error) => {
      // TODO ...
      console.log(error);
    });
  };

  poll();
  this.ready();

  const interval = Meteor.setInterval(
    poll,
    Meteor.settings.private.dropbox.pollIntervalMs
  );

  this.onStop(() => {
    Meteor.clearInterval(interval);
  });
});

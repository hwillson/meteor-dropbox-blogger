/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Dropbox from 'dropbox';
import s from 'underscore.string';

const COLLECTION_NAME = 'files';

Meteor.publish('files.all', function filesAll(currentLanguage) {
  check(currentLanguage, String);

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
            let order = 0;
            let language;
            let hidden = false;
            const filenameParts = file.name.split('__');
            const fileConfig = filenameParts[0];
            if (fileConfig.startsWith('_')) {
              language = fileConfig.replace('_', '');
              hidden = true;
            } else {
              const configComponents = fileConfig.split('_');
              language = configComponents[0];
              order = configComponents[1];
            }
            const filename = filenameParts[1];

            const fileTitle = filename.split('.')[0];
            const title = fileTitle.replace('_', ' ');
            let slug = s(fileTitle.toLowerCase()).dasherize().value();
            if (slug.charAt(0) === '-') {
              slug = slug.substring(1);
            }
            slug = slug.replace('?', '');
            const isHome =
              (slug === Meteor.settings.public.site.home[currentLanguage]);
            const fileContent = {
              title,
              order,
              slug,
              content: decodeURIComponent(escape(file.fileBinary)),
              hidden,
              language,
              isHome,
            };
            if (fileContent.language === currentLanguage) {
              if (publishedKeys[file.id]) {
                this.changed(COLLECTION_NAME, file.id, fileContent);
              } else {
                publishedKeys[file.id] = true;
                this.added(COLLECTION_NAME, file.id, fileContent);
              }
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

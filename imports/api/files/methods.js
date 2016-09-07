import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';

const loadSiteContent = new ValidatedMethod({
  name: 'files.loadSiteContent',
  validate: new SimpleSchema({
    language: { type: String },
  }).validator(),
  run({ language }) {
    let loadedContent = [];
    if (!this.isSimulation) {
      import redis from 'redis';
      const redisClient = redis.createClient();
      const getKeys = Meteor.wrapAsync(redisClient.keys, redisClient);
      const getContent = Meteor.wrapAsync(redisClient.hgetall, redisClient);
      const keys = getKeys(`*${language}_*`);
      keys.forEach((key) => {
        const content = getContent(key);
        content.hidden = (content.hidden === 'true');
        content.order = parseInt(content.order, 10);
        loadedContent.push(content);
      });
      loadedContent = _.sortBy(loadedContent, content => content.order);
    }
    return loadedContent;
  },
});

export default loadSiteContent;

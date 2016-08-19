import { Mongo } from 'meteor/mongo';

import FileSchema from './schema';

const Files = new Mongo.Collection('files');
Files.attachSchema(FileSchema);

export default Files;

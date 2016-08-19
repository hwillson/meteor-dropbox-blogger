import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const FileSchema = new SimpleSchema({
  title: {
    type: String,
  },
  order: {
    type: Number,
  },
  slug: {
    type: String,
  },
  content: {
    type: String,
  },
  hidden: {
    type: Boolean,
  },
});

export default FileSchema;

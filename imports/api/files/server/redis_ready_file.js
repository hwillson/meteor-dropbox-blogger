import s from 'underscore.string';

const RedisReadyFile = (() => {
  const publicApi = {
    dnFilename: null,
    language: 'en',
    hidden: false,
    order: 0,
    rawTitle: null,
    formattedTitle: null,
    slug: null,
    content: null,
  };

  const privateApi = {
    dbFilenameParts: [],
    dbFilenamePrefix: null,
    dbFilenamePrefixParts: [],
  };

  /* Public */

  // Convert incoming dropbox file into a redis ready file
  publicApi.init = (dropboxFile) => {
    if (dropboxFile) {
      privateApi.extractAndSetFileMetaData(dropboxFile);
      privateApi.extractAndSetLanguage();
      privateApi.extractAndSetHidden();
      privateApi.extractAndSetOrder();
      privateApi.extractAndSetRawTitle();
      privateApi.setFormattedTitle();
      privateApi.extractAndSetSlug();
      privateApi.convertAndSetContent(dropboxFile);
    }
  };

  publicApi.getFile = () => ({
    title: publicApi.formattedTitle,
    order: publicApi.order,
    slug: publicApi.slug,
    content: publicApi.content,
    hidden: publicApi.hidden,
    language: publicApi.language,
  });

  publicApi.getHash = () => ([
    'title', publicApi.formattedTitle,
    'order', publicApi.order,
    'slug', publicApi.slug,
    'content', publicApi.content,
    'hidden', publicApi.hidden,
    'language', publicApi.language,
  ]);

  /* Private */

  // Extract file meta data from the dropbox file name
  privateApi.extractAndSetFileMetaData = (dropboxFile) => {
    publicApi.dbFilename = dropboxFile.name;
    privateApi.dbFilenameParts = dropboxFile.name.split('__');
    privateApi.dbFilenamePrefix = privateApi.dbFilenameParts[0];
    privateApi.dbFilenamePrefixParts = privateApi.dbFilenamePrefix.split('_');
  };

  // Extract language from filename
  privateApi.extractAndSetLanguage = () => {
    if (privateApi.dbFilenamePrefix.startsWith('_')) {
      publicApi.language = privateApi.dbFilenamePrefix.replace('_', '');
    } else {
      publicApi.language = privateApi.dbFilenamePrefixParts[0];
    }
  };

  // See if file is hidden based on a leading '_' in the filename
  privateApi.extractAndSetHidden = () => {
    publicApi.hidden = false;
    if (privateApi.dbFilenamePrefix.startsWith('_')) {
      publicApi.hidden = true;
    }
  };

  // Extract display order from filename
  privateApi.extractAndSetOrder = () => {
    publicApi.order = 0;
    if (!privateApi.dbFilenamePrefix.startsWith('_')) {
      publicApi.order = privateApi.dbFilenamePrefixParts[1];
    }
  };

  // Extract raw file title from filename
  privateApi.extractAndSetRawTitle = () => {
    const filename = privateApi.dbFilenameParts[1];
    publicApi.rawTitle = filename.split('.')[0];
  };

  // Format the raw title for display purposes
  privateApi.setFormattedTitle = () => {
    publicApi.formattedTitle = publicApi.rawTitle.replace('_', ' ');
  };

  // Extract and format slug from the faw file title
  privateApi.extractAndSetSlug = () => {
    let slug = s(publicApi.rawTitle.toLowerCase()).dasherize().value();
    if (slug.charAt(0) === '-') {
      slug = slug.substring(1);
    }
    publicApi.slug = slug.replace('?', '');
  };

  // Make sure content is stored using UTF-8 encoding
  privateApi.convertAndSetContent = (dropboxFile) => {
    publicApi.content = decodeURIComponent(escape(dropboxFile.fileBinary));
  };

  return publicApi;
})();

export default RedisReadyFile;

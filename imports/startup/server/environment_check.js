// Make sure necessary environment variables are defined and available
['DROPBOX_TOKEN', 'REDIS_URL'].forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Uh oh - the ${envVar} environment variable is missing!`);
  }
});

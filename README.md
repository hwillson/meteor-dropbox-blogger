[![Stories in Ready](https://badge.waffle.io/hwillson/meteor-dropbox-blogger.png?label=ready&title=Ready)](https://waffle.io/hwillson/meteor-dropbox-blogger)
# meteor-dropbox-blogger

[Meteor](https://meteor.com) based blogging system that leverages [Dropbox](https://dropbox.com) for content management.

## Overview

Super simple linear blogging system that pulls all site content from Dropbox, leveraging the Dropbox API via the [dropbox](https://www.npmjs.com/package/dropbox) npm package. Site content is stored in a configurable Dropbox location, with site pages stored as individual files. File names are used as site menu item names, and files prefixed with numbers (1_*, ...) will be sorted accordingly when showing the menu. Dropbox content changes are polled regularly (poll time is configurable), so content changes show up on the main published site automatically. [Prerender.io](https://prerender.io/) is configured for server side rendering (SEO).

## Prerequisites

You will need a configured [Dropbox API app](https://www.dropbox.com/developers/apps). Make sure your configured app only has access to a single folder, and that you've generated an "access token".

## Running

### Development

1. `git clone https://github.com/hwillson/meteor-dropbox-blogger.git`
2. `cd meteor-dropbox-blogger; meteor npm install`
3. Tweak any configuration items via `/config/settings_local.json`.
4. Start the app: `meteor npm start`

### Production

TODO

## Configuration

Application configuration is controlled through `settings*.json` files, stored in `/config`. These settings are explained below:

```
{
  "public: {  
    "site": {
      "name": "Awesome Site" [Your site title (shows in `head > title`)]
    }    
  },
  "private": {
    "dropbox: {
      "token": "somelongrandomstring", [Your Dropbox API app access token]
      "pollIntervalMs": 5000 [Dropbox content change poll interval in milliseconds]
    }
  }
}   
```    
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
  "public": {  
    "site": {
      "title": "Awesome Site" [Your site title (shows in `head > title`)]
    }    
  },
  "private": {
    "dropbox": {
      "token": "somelongrandomstring", [Your Dropbox API app access token]
      "pollIntervalMs": 5000 [Dropbox content change poll interval in milliseconds]
    }
  }
}   
```

## Dropbox Files

Content files stored in Dropbox should use the following format:

```
order__page_title.html
```

The title portion of the filename is used in the sites top menu, as a menu item. The order portion of the filename is a number used to sort the page titles when displayed in the top menu. Underscores in the page title are converted into spaces when shown in the site menu, and page titles are capitalized.

Example:

```
1__home.html       --> shown as "Home" in the first top menu location
2__contact_us.html --> shown as "Contact Us" in the second top menu location
```

### Special Files

The following files are interpreted a bit differently than other site files:

- **1__home.html** - Holds site homepage content. This file is mandatory.
- **_sidebar.html** - Holds right hand sidebar content.
- **_footer.html** - Holds footer content.

## Prerender.io (SEO)

Pre-rendering has been configured using the [dfischer:prerenderio](https://atmospherejs.com/dfischer/prerenderio) package, as well as [mdg:seo](https://atmospherejs.com/mdg/seo) if deploying to [Galaxy](http://meteor.com/hosting). To test pre-rendering locally:

```
git clone https://github.com/prerender/prerender.git
cd prerender
npm install
export PORT=3500
node server.js
```

then access your local app as: `http://localhost:3500/http://localhost:3000/home`
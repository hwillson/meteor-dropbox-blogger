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
4. Start the app: `DROPBOX_TOKEN="yourtokenhere" meteor --settings=config/settings_local.json`

### Production

TODO

## Configuration

Application configuration is controlled through `settings*.json` files, stored in `/config`. These settings are explained below:

```
{
  "public": {  
    "site": {
      "title": "Awesome Site", [Your site title (shows in `head > title`)]
      "languages": [
        { "en": "English" } [Available languages]
      ]
    }    
  },
  "private": {
    "dropbox": {
      "pollIntervalMs": 5000 [Dropbox content change poll interval in milliseconds]
    }
  }
}   
```

## Dropbox Files

Content files stored in Dropbox should use the following format:

```
language_order__page_title.html
```

The title portion of the filename is used in the sites top menu, as a menu item. The order portion of the filename is a number used to sort the page titles when displayed in the top menu. Language should line up with one of the defined language codes in your `settings.json`.  Underscores in the page title are converted into spaces when shown in the site menu, and page titles are capitalized.

Example:

```
en_1__home.html       --> shown as "Home" in the first top menu location
en_2__contact_us.html --> shown as "Contact Us" in the second top menu location
```

### Special Files

The following files are interpreted a bit differently than other site files:

- **`en_1__home.html`** - Holds site homepage content. This file is mandatory.
- **`_en__sidebar.html`** - Holds right hand sidebar content (can have multiple files for different languages)
- **`_en__footer.html`** - Holds footer content (can have multiple files for different languages).

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
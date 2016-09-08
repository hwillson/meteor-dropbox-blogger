[![Stories in Ready](https://badge.waffle.io/hwillson/meteor-dropbox-blogger.png?label=ready&title=Ready)](https://waffle.io/hwillson/meteor-dropbox-blogger)

# meteor-dropbox-blogger

[Meteor](https://meteor.com) based blogging system that leverages [Dropbox](https://dropbox.com) for content management, and [Redis](http://redis.io) for content delivery.

## Overview

Super simple blogging system that pulls all site content from Dropbox, leveraging the Dropbox API via the [dropbox](https://www.npmjs.com/package/dropbox) npm package. Site content is stored in a configurable Dropbox location, with site pages stored as individual files. File names are used as site menu item names, and files prefixed with numbers will be sorted accordingly when showing the menu. Dropbox content changes are polled regularly (poll time is configurable), so content changes show up on the main published site automatically. [Prerender.io](https://prerender.io/) is configured for server side rendering (SEO).

For performance (and to make sure we aren't hitting Dropbox's max allowed API requests within a certain timeframe), content pulled from Dropbox is stored within a Redis data store. All site content is served from Redis, while a Dropbox to Redis synch happens behind the scenes, at a configured interval.

## Prerequisites

You will need a configured [Dropbox API app](https://www.dropbox.com/developers/apps). Make sure your configured app only has access to a single folder, and that you've generated an "access token". You will also need access to a Redis data store (for production, I recommend the Redis offering from [Compose](https://www.compose.com)).

## Running

### Development

1. Make sure you've configured a Dropbox API app and known the app's token.
2. Make sure you have a local Redis data store ready for use (for example, on MacOS you can install redis using `brew install redis`).
3. `git clone https://github.com/hwillson/meteor-dropbox-blogger.git`
4. `cd meteor-dropbox-blogger; meteor npm install`
5. Tweak any configuration items via `/config/settings_local.json`.
6. Start the app, making sure you define the needed `DROPBOX_TOKEN` and `REDIS_URL` environment variables: `DROPBOX_TOKEN="token" REDIS_URL="redis://localhost" meteor --settings=config/settings_local.json`

### Production

Deploy to your production Meteor host as you would normally, making sure your pointing to an updated production `settings.json` file, and have defined the `DROPBOX_TOKEN` and `REDIS_URL` environment variables. Here's a sample `settings.json` for [Galaxy](https://www.meteor.com/hosting):

```
{
  "galaxy.meteor.com": {
    "env": {
      "ROOT_URL": "https://www.someawesomeapp.yes",
      "DROPBOX_TOKEN": "token",
      "REDIS_URL": "redis://suer:pass@host:port"
    }
  },
  "public": {
    "site": {
      "languages": [
        { "code": "en", "label": "English" },
        { "code": "fr", "label": "French" }
      ],
      "title": {
        "en": "English Site Title",
        "fr": "French Site Title"
      },
      "home": {
        "en": "home",
        "fr": "accueil"
      }
    }
  },
  "private": {
    "cron": {
      "enabled": true,
      "schedule": "0 */5 * * * *"
    }
  }
}
```

## Configuration

Application configuration is controlled through a `settings.json` file. An example development `settings_local.json` file can be found in `/config`. These settings are explained below:

```
{
  "public": {
    "site": {
      // Available site languages; if more than one language is defined the site will 
      // show a language selection dropdown in the header
      "languages": [
        { "code": "en", "label": "English" },
        { "code": "fr", "label": "French" }
      ],
      // Site head title for each language
      "title": {
        "en": "Some Random Test Site [en]",
        "fr": "Some Random Test Site [fr]"
      },
      // Home page slug (used to redirect during a language toggle)
      "home": {
        "en": "home",
        "fr": "accueil"
      }
    }
  },
  "private": {
    // Settings for the dropbox to redis synch process
    "cron": {
      // Enable/disable the synch process (true/false)
      "enabled": false,
      // Cron schedule; for example, run every 5 minutes
      "schedule": "0 */5 * * * *"
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
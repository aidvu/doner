# doner
A Done List App.  
  
Backend is PHP/MySQL written from scratch.  
UI is built using React.js/Flux.

## DB Setup
Schema create SQL with some demo data is in [api/doner.sql](https://github.com/aidvu/doner/blob/master/api/doner.sql)  

    mysql -u[user] -p[pass] < api/doner.sql

## API Setup

### Class Autoloader
[Composer](https://getcomposer.org/) is used for autoloading, so you need to get it and run in api/  

    php composer.phar update -o

### config.php

DB settings are the usual stuff.  
AUTH_CLASS should be a namespaced class name, e.g.: ```\Doner\Authorization\CookieAuthorization```  
API_PATH relative to the website root, e.g. http://somedomain.com/doner API_PATH is /doner/api, http://doner.com is /api  

## UI Setup

You must have [npm](https://www.npmjs.org/) installed on your computer.
From the root project directory run these commands from the command line:

    npm install

This will install all dependencies.

To build the project, first run this command:

    npm start

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make.  This watcher is based on [Browserify](http://browserify.org/) and [Watchify](https://github.com/substack/watchify), and it transforms React's JSX syntax into standard JavaScript with [Reactify](https://github.com/andreypopp/reactify).

For a production build run:

    npm run build

And change the script to bundle.min.js in [index.html](https://github.com/aidvu/doner/blob/master/index.html#L45).  

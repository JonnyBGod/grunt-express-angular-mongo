grunt-express-angular-mongo
================================

Bootstrap app with Grunt, Bower, Expressjs, Angularjs, Requirejs, MongoDB + goodies

## Goals

The goal of this project was to provide a working yeoman-based SPA (single page app) that includes the following things:

* RequireJS
* AngularJS, working properly with RequireJS
* Working twitter bootstrap (as of 5/8/2013 getting bootstrap+angularJS to work together in yeoman is not working out-of-the-box) sitting alongside AngularJS
* SASS
* An embedded node.js server to provide the underlying server-side api for the SPA to call, that functions from within the `grunt dev` command and is available on the same host/port as the SPA code in that model

## Prerequisites

* Nodejs + NPM
* You must have yeoman (including grunt and bower) installed.  This project assumes 1.0rc4 or later of yeoman `npm install -g yo`

## Installation
* Clone the git repository: `git clone https://github.com/JonnyBGod/grunt-express-angular-mongo _your_local_directory_name_`
* `cd _your_local_directory_name_`

## Getting Started

* Install all denpendencies
```bash
$ npm install
$ bower install
```

* Change all UPPER_CASE_SNAKE_NAMES
```bash
$ ./server/config.js //Change at least all "db" and "name".
$ ./app/scripts/app.js //Change YOUR_ACCOUNT_HERE for your adwords account id.
```

* Substitute `./server/public.pem` and `./server/private.key` for your own certificate files (https://help.ubuntu.com/community/SSH/OpenSSH/Keys)

* That should be it.  Run `grunt dev` and the app should come up and run at http://localhost:9000/ and https://localhost:9001 or whatever IP address you ran it on.

## Grunt commands

* Launch develepment server `grunt dev`

* Launch production server for testing `grunt prod`

* Build for production `grunt build`

* Release `grunt push`
```bash
$ // Aditional release commands
$
$ grunt push:patch //version 0.0.2
$ grunt push:minor //version 0.1.0
$ grunt push:major //version 1.0.0
$ grunt push:git //version 0.0.1-1
$
$ grunt bump-only:minor
$ grunt changelog
$ grunt push-commit
$ grunt push-release //This will do a full push and publish to npm even if you have configured npm option to false
$ grunt push-publish //Just publishes to NPM overriding (npm option: false)
```

* Production server launch `NODE_ENV=production node server`

## Some notes

If you find bugs/want to contribute, please create an issue on this project


-----------------------------------
Released under a MIT-style license.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/JonnyBGod/grunt-express-angular-mongo/trend.png)](https://bitdeli.com/free "Bitdeli Badge")


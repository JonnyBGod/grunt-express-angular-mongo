yoeman-express-angular-fullstack
================================

Bootstrap app with Grunt, Bower, Expressjs, Angularjs, Requirejs + goodies

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
* Clone the git repository: `git clone https://github.com/JonnyBGod/yoeman-express-angular-fullstack _your_local_directory_name_`
* `cd _your_local_directory_name_`

## Getting Started

* Install all denpendencies
```bash
$ npm install
$ bower install
```

* Change all UPPER_CASE_SNAKE_NAMES (ids, passwords, names, etc..)

* Substitute public.pem and private.pem for your own certificate files (https://help.ubuntu.com/community/SSH/OpenSSH/Keys)

* That should be it.  Run `grunt dev` and the app should come up and run at http://localhost:9000/ and https://localhost:9001 or whatever IP address you ran it on.

## Grunt commands

* Launch develepment server `grunt dev`

* Launch production server for testing `grunt prod`

* Build for production `grunt build`

* Release
```bash
$ grunt bump
$ //For now you have to comit yourself the full project
$ git add .
$ git commit -m 'your message'
$ git push origin
```

## Some notes

If you find bugs/want to contribute, please create an issue on this project


-----------------------------------
Released under a MIT-style license.
#Setup NPM, Gulp, Mocha, Chai and Webpack with AngularJS from scratch

This is a very basic setup/seed to make everything work and get started on your project. Tested on
OSX El Capitan

Prerequisites: Basic knowledge of AngularJS and make sure you have XCode and git installed

#Install NPM:

Install NodeJS with NPM:
https://nodejs.org/en/download/
```
$node --version
$npm --version
```
Remove EACCESS error (Install NPM packages without sudo)

Reference: https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md
```
$mkdir "${HOME}/.npm-packages"
```
Add in your ~/.npmrc
```
prefix=${HOME}/.npm-packages
```
Check Shell (bash or zsh):
```
echo $0
```
Update .bashrc/.zshrc based on your shell:
```
$ vi ~/.bashrc
```
Copy this in your ~/.bashrc file:
```
NPM_PACKAGES="${HOME}/.npm-packages"

PATH="$NPM_PACKAGES/bin:$PATH"

# Unset manpath so we can inherit from /etc/manpath via the `manpath` command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
export MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```
Run to update NPM:
```
$ npm install -g npm
```
#Download this skeleton project:
(https://github.com/arp1t/basic_angular_app/)
```
$ git clone https://github.com/arp1t/basic_angular_app.git
```
Create package.json
```
basic_angular_app$ npm init
```
Enter these values to create a package.json:
```
name: (basic_angular_app)
version: (1.0.0) 0.0.1
description: Basic Angular App
entry point: (index.js) gulpfile.js
test command: ./node_modules/.bin/mocha
git repository: (https://github.com/arp1t/basic_angular_app.git)
keywords: npm, gulp, webpack, chai, mocha
author: Arpit Shah
license: (ISC) MIT
```
#Install Gulp:
Reference: https://css-tricks.com/gulp-for-beginners/
Reference: https://travismaynard.com/writing/getting-started-with-gulp
```
$ npm install -g gulp
$ npm install --save-dev gulp
```
You would see your 'package.json' updated with gulp dependency and a new 'node_modules' folder added.

Create a 'gulpfile.js' in 'basic_angular_app/' and add this:
```
//Include gulp
var gulp = require('gulp');

//Sample Task
gulp.task('hello', function(){
console.log('Hello Arpit');
});
```
Now run:
```
$gulp hello

//This will run the hello task and put your name in the console
//If for some reason your global gulp is not installed properly,
//you can try running the local gulp in our project (ideal) by:

$ ./node_modules/gulp/bin/gulp.js hello
```

#Add LiveReload with browser-sync:
Reference: https://css-tricks.com/gulp-for-beginners/

Install browser-sync:
```
$ npm install browser-sync --save-dev
```
Add this above 'sample task' in gulpfile.js
```
//Include Plugins
var browserSync = require('browser-sync').create();

//BrowserSync Task
gulp.task('browserSync', function() {
  browserSync.init({
  server: {
  baseDir: 'app'
  },
  })
})

//Watch tasks
gulp.task('watch', ['browserSync'], function (){
     //Reloads the browser whenever these files change
     gulp.watch('app/**/*.html', browserSync.reload);
     gulp.watch('app/**/*.css', browserSync.reload);
     gulp.watch('app/**/*.js', browserSync.reload);
})
```
Run to confirm:
```
$ gulp watch
//OR
$ ./node_modules/gulp/bin/gulp.js watch
```
Now, if you update any html, css or js file under app/ , the browser will automatically reload.

#Testing: Mocha and Chai

Install mocha and chai:
```
$npm install mocha chai --save-dev
```
I already have a basic test in app/test/test.js:
```
var mocha = require('mocha'),
chai = require('chai');

var expect = chai.expect;

describe("A basic test", function() {
  it('should pass when everything is okay', function() {
  expect(true).to.be.true;
  });
});
```

Run:
```
$ npm test
//NPM will run ./node_modules/mocha/bin/mocha which we already typed in our package.json
```
#Webpack:

Install webpack, css-loader and style-loader:
```
$ npm install --save-dev webpack
$ npm install --save-dev css-loader
$ npm install --save-dev style-loader
```
Create 'webpack.config.js' in 'basic_angular_app/' and paste this code:
```
var webpack = require('webpack');

var config = {
  context: __dirname + '/app',
  entry: './index.js',
  output: {
  path: __dirname + '/app',
  filename: 'bundle.js'
  },

  plugins: [
  new webpack.DefinePlugin({
  ON_TEST: process.env.NODE_ENV === 'test'
  })
  ],

  module: {
  loaders: [
  {test: /\.css$/, loader: 'style!css', exclude: /node_modules/},
  ]
  }
};

if (process.env.NODE_ENV === 'production') {
  config.output.path = __dirname + '/dist';
}

module.exports = config;
```
Create app/index.js and paste this:
```
//Including CSS
require ('./css/main.css');

//Including JS
require('./js/vendor/angular.min.js');
```
Remove this css and js include from index.html and replace it with
```
<script src="bundle.js"></script>
```
Run webpack to create a bundle:
```
$ webpack
//OR
$ ./node_modules/webpack/bin/webpack.js
//This will bundle CSS and JS mentioned in index.js following configuration in webpack.config.js
```
Check if everything loads correctly:
```
$ gulp watch
//OR
$ ./node_modules/gulp/bin/gulp.js watch
```
Later, you can minify, uglify etc those files and put it in production and integrate he task with gulp.

#Notification:
Reference: http://sachinchoolur.github.io/angular-flash/

Include angular-flash CSS and JS in index.html
```
<link href="https://raw.githubusercontent.com/sachinchoolur/angular-flash/master/dist/angular-flash.css" rel="stylesheet" />

<script src="https://raw.githubusercontent.com/sachinchoolur/angular-flash/master/dist/angular-flash.min.js"></script>
```
Include 'ngFlash' as a dependency in app.js
```
var app=angular.module("BoltNetworkApp",['ngFlash','ui.router']);
```
Paste the FlashController in app.js
```
// Flash controller
app.controller('NotificationController', ['$rootScope', '$scope', 'Flash', '$timeout', function($rootScope, $scope, Flash, $timeout) {
  $scope.success = function() {
  var message = '<strong>Well done!</strong> You successfully read this important alert message.';
  Flash.create('success', message);
  };
  $scope.info = function() {
  var message = '<strong>Heads up!</strong> This alert needs your attention, but it\'s not super important.';
  Flash.create('info', message);
  };
  $scope.warning = function() {
  var message = '<strong>Warning!</strong> Better check yourself, you\'re not looking too good.';
  Flash.create('warning', message);
  };
  $scope.danger = function() {
  var message = '<strong>Oh snap!</strong> Change a few things up and try submitting again.';
  Flash.create('danger', message);
  };
}]);
```

This is the code to include flash message:
```
<div ng-controller="NotificationController">
  <flash-message duration="5000"></flash-message>
</div>
```

This is the code to trigger notifications:
```
<div ng-controller="NotificationController">
  <button class="btn btn-success" ng-click="success()">Success</button>
  <button class="btn btn-info" ng-click="info()">Info</button>
  <button class="btn btn-warning" ng-click="warning()">Warning</button>
  <button class="btn btn-danger" ng-click="danger()">Danger</button>
</div>
```
Update app/views/home.html:
```
<div class="main">
<div ng-controller="NotificationController">
<flash-message duration="5000"></flash-message>
</div>
  <div class="container">
  <div class="content" ng-repeat="program in programs">
<program-listing listing="program"></program-listing>
  <div ng-controller="NotificationController">
  <button class="btn btn-success" ng-click="success()">Success</button>
<button class="btn btn-info" ng-click="info()">Info</button>
<button class="btn btn-warning" ng-click="warning()">Warning</button>
<button class="btn btn-danger" ng-click="danger()">Danger</button>
</div>
  </div>
  </div>
</div>
```
Update app/views/about.html:
```
<div class="main">
<div ng-controller="NotificationController">
<flash-message duration="5000"></flash-message>
</div>
  <div class="container">
<h1>About Us</h1>
  <div ng-controller="NotificationController">
  <button class="btn btn-success" ng-click="success()">Success</button>
<button class="btn btn-info" ng-click="info()">Info</button>
<button class="btn btn-warning" ng-click="warning()">Warning</button>
<button class="btn btn-danger" ng-click="danger()">Danger</button>
</div>
</div>
</div>
```
Update app/views/pricing.html:
```
<div ng-controller="NotificationController">
<button class="btn btn-success" ng-click="success()">Success</button>
<button class="btn btn-info" ng-click="info()">Info</button>
<button class="btn btn-warning" ng-click="warning()">Warning</button>
<button class="btn btn-danger" ng-click="danger()">Danger</button>
</div>
<div class="main">
  <div class="container">
<h1>Pricing Page</h1>
</div>
<div ng-controller="NotificationController">
<flash-message duration="5000"></flash-message>
</div>
</div>
```
Later on, you can make a separate template for notification messages or include the html in the header template to avoid redundancy.

#End
I have added a 'setup' branch with complete configuration that works for me.

Additionally, you can include 'angular-flash.min.js' and 'angular-ui-router.js' into index.js, so that webpack can take care of the includes.

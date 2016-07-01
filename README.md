#Setup NPM, Gulp, Mocha, Chai and Webpack with AngularJS from scratch

Prerequisites: Make sure you have XCode and git installed (Tested on OSX)

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
To be added.

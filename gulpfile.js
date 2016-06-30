//Include gulp
var gulp = require('gulp');

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

//Sample Task
gulp.task('hello', function(){
	console.log('Hello Arpit');
});
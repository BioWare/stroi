var gulp 					  = require('gulp');
var browserSync		  = require('browser-sync').create();
var sass					  = require('gulp-sass');
var autoprefixer 	  = require('gulp-autoprefixer');
var concatCSS		    = require('gulp-concat-css');
var ftp						  = require('gulp-ftp');

gulp.task('sass', function (done) {
	gulp.src("src/sass/*.sass")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concatCSS("style.css"))
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());


	done();
});

gulp.task('serve',  function (done) {
	
	browserSync.init({
		server: "src/"
	});

	gulp.watch("src/sass/*.sass", gulp.series('sass'));
	gulp.watch("src/*.html").on('change', () => {
		browserSync.reload();
		done();
	});

	browserSync.reload();
	done();
	
});

// gulp.task('ftp', function () {
// 	return gulp.src('src/**')
// 		.pipe(ftp({
// 			host: 'website.com',
// 			user: 'johndoe',
// 			pass: '1234',
// 			remotePath: 'www/domenName/stream'
// 		}))
// 		.pipe(gutil.noop());
// });

gulp.task('default', gulp.series('sass', 'serve'));
var browserify = require('browserify')
	, argv = require('yargs').argv
	, buffer = require('vinyl-buffer')
	, gp = require('gulp-load-plugins')()
	, gulp = require('gulp')
	, sequence = require('run-sequence')
	, source = require('vinyl-source-stream')
	, watchify = require('watchify')
	, babelify = require('babelify')
	, lrload = require('livereactload')

var deploy = false
	, watching = false

const jsFile = 'main.js'
	, sourceDir = `${__dirname}/client/src`
	, publicDir = `${__dirname}/client/public`
	, proxy = 'context.dev'

gulp.task('assets', ['styles', 'scripts', 'media'])

gulp.task('media', () => gulp.src([`${sourceDir}/{img,fonts,admin}/**/*`]).pipe(gulp.dest(publicDir)))

gulp.task('styles', function() {
	return gulp.src(sourceDir + '/scss/main.scss')
		.pipe(gp.plumber({errorHandler: gp.notify.onError('Error: <%= error.message %>')}))
		.pipe(gp.sass({
			errLogToConsole: true
		}))
		.pipe(gp.if(!deploy, gp.sourcemaps.init({loadMaps: true})))
		.pipe(gp.autoprefixer())
		.pipe(gp.if(deploy, gp.minifyCss()))
		.pipe(gulp.dest(`${publicDir}/styles`))
})

var bundleErrHandler = function(err) {
	gp.util.log(err.toString())
	gp.notify.onError('Error: <%= error.message %>')
	console.log(err.stack);
	deploy ? process.exit(1) : this.end()
}

gulp.task('scripts', function() {

	const babelOpts = {
		optional: [
			'es7.objectRestSpread',
			'es7.decorators',
			'es7.classProperties',
		],
	}

	const bundler = browserify({
		entries: [`${sourceDir}/scripts/${jsFile}`],
		transform: [babelify.configure(babelOpts)],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true,
	})

	const watcher = watching ? watchify(bundler) : bundler

	const compile = function(bundle) {
		bundle
			.bundle()
			.on('error', bundleErrHandler)
			.pipe(source(jsFile))
			.pipe(buffer())
			.pipe(gp.if(deploy, gp.uglify()))
			.pipe(gulp.dest(`${publicDir}/scripts`))
		gp.util.log(`Browserify built: ${(new Date).toTimeString()}`)
		return bundle
	}

	watcher.on('update', () => compile(watcher))
	compile(watcher)
})

gulp.task('default', function(callback) {

	watching = true

	gulp.watch(`${sourceDir}/scss/**/*.scss`, ['styles'])
	gulp.watch(`${sourceDir}/fonts/**/*`, ['fonts'])
	gulp.watch(`${sourceDir}/images/**/*`, ['images'])

	sequence(['assets'], callback)
})

gulp.task('build', function(callback) {
	deploy = true
	sequence(['assets'], callback)
})

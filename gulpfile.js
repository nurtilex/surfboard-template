const { src, dest, task, series, parallel, watch } = require('gulp')

const { DIST_PATH, SRC_PATH, STYLES_LIBS, JS_LIBS } = require('./gulp.config')
const rm = require('gulp-rm')
const sass = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob')
const autoprefixer = require('gulp-autoprefixer')
const px2rem = require('gulp-smile-px2rem')
const gcmq = require('gulp-group-css-media-queries')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const gulpif = require('gulp-if')

const env = process.env.NODE_ENV

task('clean', () => {
	return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm())
})
task('copy:img', () => {
	return src(`${SRC_PATH}/img/*`).pipe(dest('dist/img/'))
})

task('copy:html', () => {
	return src(`${SRC_PATH}/*.html`)
		.pipe(dest('dist/'))
		.pipe(reload({ stream: true }))
})

task('styles', () => {
	return (
		src([...STYLES_LIBS, `${SRC_PATH}/css/main.scss`])
			.pipe(gulpif(env === 'dev', sourcemaps.init()))
			.pipe(concat('main.scss'))
			.pipe(sassGlob())
			.pipe(sass().on('error', sass.logError))
			// .pipe(px2rem())
			.pipe(
				gulpif(
					env === 'prod',
					autoprefixer({
						cascade: false,
					})
				)
			)
			.pipe(gulpif(env === 'prod', gcmq()))
			// .pipe(gulpif(env === 'prod', cleanCSS()))

			.pipe(gulpif(env === 'dev', sourcemaps.write()))
			.pipe(dest('dist/css/'))
			.pipe(reload({ stream: true }))
	)
})

task('scripts', () => {
	return src(`${SRC_PATH}/js/*.js`)
		.pipe(gulpif(env === 'dev', sourcemaps.init()))
		.pipe(concat('main.js'))
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		// .pipe(gulpif(env === 'prod', uglify()))
		.pipe(gulpif(env === 'dev', sourcemaps.write()))
		.pipe(dest('dist/js'))
		.pipe(reload({ stream: true }))
})

task('server', () => {
	browserSync.init({
		server: {
			baseDir: './dist',
		},
		open: false,
	})
})

task('watch', () => {
	watch(`${SRC_PATH}/**/*.scss`, series('styles'))
	watch(`${SRC_PATH}/js/*.js`, series('scripts'))
	watch(`${SRC_PATH}/*.html`, series('copy:html'))
	watch(`${SRC_PATH}/img/*`, series('copy:img'))
})

task(
	'default',
	series(
		'clean',
		parallel('copy:html', 'copy:img', 'styles', 'scripts'),
		parallel('watch', 'server')
	)
)

task(
	'build',
	series('clean', parallel('copy:html', 'copy:img', 'styles', 'scripts'))
)

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('dev', ['server'], () => {
    return nodemon({
        ext: 'js',
        tasks: ['server'],
        script: 'gulpfile.js',
    });
});

gulp.task('server', () => {
    let config = null;
    return Promise.resolve()
        .then(() => {
            return require('./server/config/app.config.js')
                .init('127.0.0.1', 3001);
        })
        .then((_config) => {
            config = _config;
            return require('./server/db').init(config.connectionString);
        })
        .then((db) => require('./server/data').init(db))
        .then((data) => {
            data.sessionStoreName = config.sessionStoreName;
            return require('./server/app').init(data);
        })
        .then((app) => {
            app.listen(config.port, () =>
                console.log(`Server running at: ${config.port}`));
        });
});

const del = require('del');

gulp.task('clear:html', () => {
    return del(['./public/**/*.html']);
});

gulp.task('compile:html', ['clear:html'], () => {
    return gulp.src('./app/*.html')
        .pipe(gulp.dest('./public'));
});

const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task('clear:js', () => {
    return del(['./public/js/*.js']);
});

gulp.task('compile:js', ['clear:js'], () => {
    return gulp.src(['./app/js/**/*.js'])
        .pipe(babel({
            presets: ['env'],
        }))
        .pipe(concat('min.app.js'))
        .pipe(uglify({
            mangle: {
                toplevel: true,
            },
        }))
        .pipe(gulp.dest('./public/js/'));
});

const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('clear:css', () => {
    return del(['./public/css/*.css']);
});

gulp.task('compile:css', ['clear:css'], () => {
    const plugins = [
        autoprefixer({
            browsers: ['last 1 version'],
        }),
        cssnano(),
    ];
    return gulp.src('./app/css/*.styl')
        .pipe(stylus())
        .pipe(postcss(plugins))
        .pipe(concat('min.main.css'))
        .pipe(gulp.dest('./public/css'));
});
const eslint = require('gulp-eslint');

gulp.task('lint:server', () => {
    return gulp.src(['./server/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:browser', () => {
    return gulp.src(['./app/**/*.js'])
        .pipe(eslint({
            globals: [
                'jQuery',
                '$',
            ],
            envs: [
                'browser',
            ],
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint:server', 'lint:browser']);

const gulpsync = require('gulp-sync')(gulp);

gulp.task('compile',
    gulpsync.sync(['lint', 'compile:html', 'compile:js', 'compile:css']));

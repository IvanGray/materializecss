var srcDir = './src',
    tempDir = './temp',
    destDir = './dest';

module.exports = {
    src: srcDir,
    dest: destDir,
    allDev:destDir + '**/*.*',
    temp: tempDir,
    html: {
        src: srcDir + '/html/*.html',
        all: srcDir + '/html/**/*.html',
        include: srcDir + '/html/include/**/*.html',
        dest: destDir
    },
    less: {
        src: srcDir + '/less/*.less',
        all: srcDir + '/less/**/*.less',
        css: srcDir + '/css/**/*.css',
        main: srcDir + '/less/style.less',
        toSass: tempDir + '/toSass/**/*.less',
        jquery: srcDir + '/less/jqueryPlugins/jqueryPlugins.less',
        dest: destDir + '/css'
    },
    css: {
        less: {
            src: srcDir + '/css/**/*.css',
            dest: srcDir + '/less/from-css'
        },
        sass: {
            src: srcDir + '/css/**/*.css',
            dest: srcDir + '/sass/from-css'
        }
    },
    js: {
        src: srcDir + '/js/*.js',
        all: srcDir + '/js/**/*.js',
        include: srcDir + '/js/include/**/*.js',
        main: srcDir + '/js/main.js',
        jquery: srcDir + '/js/jqueryPlugins.js',
        min: destDir + '/js/min',
        material: srcDir + '/js/materilize/**/*.js',
        dest: destDir + '/js'
    },
    svg: {
        src: srcDir + '/svg/*.svg',
        base64: srcDir + '/less/',
        dest: destDir + '/images/icons'
    },
    sprite: {
        src: srcDir + '/images/icons/**/*.png',
        less: srcDir + '/less/',
        dest: destDir + '/images/icons'
    },
    sass: {
        css: {
            all: srcDir + '/css/**/*.css',
            src: srcDir + '/css'
        },
        scss: {
            all: srcDir + '/sass/**/*.scss',
            less: srcDir + '/sass/fromSass',
            jquery: srcDir + '/sass/jqueryPlugins.scss',
            main: srcDir + '/sass/style.scss',
            material: srcDir + '/sass/materialize.scss',
            materialComponents: srcDir + '/sass/components/**/*.scss'
        },
        dest: destDir + '/css'
    },
    images: {
        all: srcDir + '/images/*',
        dest: destDir + '/images'
    }
};
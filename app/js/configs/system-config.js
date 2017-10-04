/* globals System */
System.config({
    transpiler: 'plugin-babel',
    map: {
        // System.js files
        'plugin-babel': './libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build':
            './libs/systemjs-plugin-babel/systemjs-babel-browser.js',

        // App files
        'app': 'js/app.js',
        'templates': 'js/templates.js',
        'data': 'js/data.js',
        'user': 'js/user.js',
        'constants': 'js/helpers/constants.js',
        'validator': 'js/helpers/validator.js',
        'facebookHelper': 'js/helpers/facebookHelper.js',

        // Controllers
        'homeController': 'js/controllers/homeController.js',

        // Library files
        'jquery': './libs/jquery/dist/jquery.min.js',
        'navigo': './libs/navigo/lib/navigo.min.js',
        'handlebars': './libs/handlebars/dist/handlebars.min.js',

    },
});

System.import('app');

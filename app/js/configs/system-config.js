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
        'templates': 'js/utils/templates.js',
        'data': 'js/utils/data.js',
        'user': 'js/utils/user.js',
        'constants': 'js/helpers/constants.js',
        'validator': 'js/helpers/validator.js',
        'carouselHelper': 'js/helpers/carousel.helper.js',
        'quoteHelper': 'js/helpers/quote.helper.js',
        'cardHelper': 'js/helpers/card.helper.js',
        'locationHelper': 'js/helpers/location.helper.js',
        'listHelper': 'js/helpers/list.helper.js',

        // Controllers
        'homeController': 'js/controllers/homeController.js',
        'signinController': 'js/controllers/signinController.js',
        'blogController': 'js/controllers/blogController.js',
        'defaultController': 'js/controllers/defaultController.js',

        // Library files
        'jquery': './libs/jquery/dist/jquery.min.js',
        'navigo': './libs/navigo/lib/navigo.min.js',
        'handlebars': './libs/handlebars/dist/handlebars.min.js',
        'toastr': './libs/toastr/build/toastr.min.js',
        'date': './libs/dateformat/lib/dateformat.js',
    },
});

System.import('app');

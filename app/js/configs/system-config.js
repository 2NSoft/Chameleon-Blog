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
        'setLink': 'js/utils/setLink.js',
        'data': 'js/utils/data.js',
        'user': 'js/utils/user.js',
        'facebookHelper': 'js/helpers/facebook.helper.js',
        'validator': 'js/helpers/validator.js',
        'carouselHelper': 'js/helpers/carousel.helper.js',
        'quoteHelper': 'js/helpers/quote.helper.js',
        'cardHelper': 'js/helpers/card.helper.js',
        'commentHelper': 'js/helpers/comment.helper.js',
        'locationHelper': 'js/helpers/location.helper.js',
        'blogPostHelper': 'js/helpers/blogPost.helper.js',
        'listHelper': 'js/helpers/list.helper.js',

        // Controllers
        'homeController': 'js/controllers/homeController.js',
        'aboutController': 'js/controllers/aboutController.js',
        'signinController': 'js/controllers/signinController.js',
        'registerController': 'js/controllers/registerController.js',
        'blogController': 'js/controllers/blogController.js',
        'createPostController': 'js/controllers/createPostController.js',
        'createCategoryController':
            'js/controllers/createCategoryController.js',
        'categoryController': 'js/controllers/categoryController.js',
        'userController': 'js/controllers/userController.js',
        'notFoundController': 'js/controllers/notFoundController.js',
        'unauthorizedController': 'js/controllers/unauthorizedController.js',
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

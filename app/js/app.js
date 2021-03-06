/* globals $ toastr */

// Routers
import Navigo from 'navigo';

// Users
import user from 'user';

// Helpers

// import {VALIDATOR as VALIDATOR} from 'validator';
import 'facebookHelper';

// Controllers
import { get as homeController } from 'homeController';
import { get as aboutController } from 'aboutController';
import { get as blogController } from 'blogController';
import { get as createPostController } from 'createPostController';
import { get as createCategoryController } from 'createCategoryController';
import { get as categoryController } from 'categoryController';
import { get as userController } from 'userController';
import { get as registerController } from 'registerController';
import { get as signinController } from 'signinController';
import { get as defaultController } from 'defaultController';
import { get as notFoundController } from 'notFoundController';
import { get as unauthorizedController } from 'unauthorizedController';

// Navigo setup
const root = null;
const useHash = true;
const hash = '#';
const router = new Navigo(root, useHash, hash);

defaultController(router)
    .then(() => {
        router.updatePageLinks();
    });

// Setting up routes
router
    .on('/', () => {
        router.navigate('/home');
    })
    .on('/home', () => {
        return homeController(router)
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/blog/:id', (params) => {
        blogController(params, router)
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/category/:id', (params, query) => {
        categoryController(params, query, router)
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/user/:id', (params, query) => {
        userController(params, query, router)
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/create/post', () => {
        return createPostController(router)
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/create/category', () => {
        return createCategoryController(router)
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/sign-in', () => {
        return signinController(router)
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/register', () => {
        return registerController()
            .catch((err) => {
                toastr.error(err);
            });
    })
    .on('/about', () => {
        return aboutController();
    })
    .on('/unauthorized', () => {
        return unauthorizedController()
            .then(() => {
                router.updatePageLinks();
            })
            .catch((err) => {
                toastr.error(err);
            });
    })
    .notFound(() => {
        return notFoundController()
            .catch((err) => {
                toastr.error(err);
            });
    })
    .resolve();

let initial = true;
user.onStatusChange = (usr) => {
    const signInBtn = $('#sign-in-btn');
    if (usr.signedIn) {
        $('.private-menu')
            .each((index, menu) => {
                $(menu).show();
            });
        signInBtn.text('Sign out');
        signInBtn.attr('href', '/home');
        if (!initial) {
            router.navigate('/home');
        } else {
            initial = false;
        }
    } else {
        $('.private-menu')
            .each((index, menu) => {
                $(menu).hide();
            });
        signInBtn.text('Sign in');
        signInBtn.attr('href', '/sign-in');
    }
};

user.checkStatus(true);

$('#sign-in-btn').click((ev) => {
    if ($('#sign-in-btn').text() === 'Sign out') {
        ev.preventDefault();
        user.signOut();
    }
});

$('.navbar-collapse ul').on('click', (ev) => {
    $(ev.currentTarget)
        .find('.isActive')
        .removeClass('isActive');
    $(ev.target).addClass('isActive');
});

export {
    router,
};

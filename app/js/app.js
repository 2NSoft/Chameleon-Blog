/* globals $ toastr */

// Routers
import Navigo from 'navigo';

// Users and data
import user from 'user';
// import * as data from 'data';

// Helpers
// import {CONSTANTS as CONSTANTS} from 'constants';
// import {VALIDATOR as VALIDATOR} from 'validator';
// import 'facebookHelper';

// Controllers
import { get as homeController } from 'homeController';
import { get as signinController } from 'signinController';
import { get as blogController } from 'blogController';
import { get as defaultController } from 'defaultController';

// Navigo setup
const root = null;
const useHash = true;
const hash = '#';
const router = new Navigo(root, useHash, hash);

defaultController(router);
// Setting up routes
router
    .on({
        '/': () => {
            router.navigate('/home');
        },
        '/home': () => {
            return homeController(router)
                .catch((err) => {
                    toastr.error(err);
                });
        },
        '/blog/:id': (params) => {
            blogController(params, router);
        },
        '/sign-in': () => {
            return signinController()
                .catch((err) => {
                    toastr.error(err);
                });
        },
        '/about': () => {
            console.log( 'about');
        },
        '/400': () => {
        },
    })
    .notFound( function() {
        console.log( 'Not found' );
    })
    .resolve();

let initial = true;
user.onStatusChange = (usr) => {
    const signInBtn = $('#sign-in-btn');
    if (usr.signedIn) {
        signInBtn.text('Sign out');
        signInBtn.attr('href', '/home');
        if (!initial) {
            router.navigate('/home');
        } else {
            initial = false;
        }
    } else {
        signInBtn.text('Sign in');
        signInBtn.attr('href', '/sign-in');
    }
};

user.checkStatus(true);

$('#sign-in-btn').click( (ev) => {
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

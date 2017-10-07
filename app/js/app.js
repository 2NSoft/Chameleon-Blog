/* globals $ */

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


// Navigo setup
const root = null;
const useHash = true;
const hash = '#';
const router = new Navigo(root, useHash, hash);

// Setting up routes
router
    .on({
        '/': () => {
            router.navigate('/home');
        },
        '/home': () => {
            return homeController()
                .catch((err) => {
                    console.log(err);
                });
        },
        '/sign-in': () => {
            return signinController()
                .catch((err) => {
                    console.log(err);
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

user.onStatusChange = (usr) => {
    const signInBtn = $('#sign-in-btn');
    if (usr.signedIn) {
        signInBtn.text('Sign out');
        signInBtn.attr('href', '');
        router.navigate('/home');
    } else {
        signInBtn.text('Sign in');
        signInBtn.attr('href', '/sign-in');
    }
};

user.checkStatus();

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

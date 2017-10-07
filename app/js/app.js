/* globals $ */

// Routers
import Navigo from 'navigo';

// Users and data
// import User from 'userController';
// import * as data from 'data';

// Helpers
// import {CONSTANTS as CONSTANTS} from 'constants';
// import {VALIDATOR as VALIDATOR} from 'validator';
// import 'facebookHelper';

// Controllers
import { get as homeController } from 'homeController';
// import {get as invalidController} from 'invalidController';
// import {get as registerController} from 'registerController';
// import {get as signInController} from 'signInController';
// import {get as currentUserController} from 'currentUserController';
// import {get as collectionManageController} from 'collectionManageController';
// import {get as viewItemsController} from 'viewItemsController';

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

// User.initAuthStatusChange();

// // Changes Sign in button to Sign out, when user signs in
// $('#sign-in-btn').click(() => {
//     if ($('#sign-in-btn').text() === 'Sign out') {
//         User.signOut();
//         toastr.success(CONSTANTS.USER_SIGNED_OUT);
//     }
// });

$('.navbar-collapse ul').on('click', (ev) => {
    $(ev.currentTarget)
        .find('.isActive')
        .removeClass('isActive');
    $(ev.target).addClass('isActive');
});

export {
    router,
};

/* globals $ toastr */

import { load as loadTemplate } from 'templates';
import { registerQuote } from 'quoteHelper';
import { registerLocation } from 'locationHelper';
import { setActiveLink } from 'setLink';


const $appContainer = $('#app-container');

export function get() {
    return Promise.all([
            registerQuote(),
            registerLocation(),
        ])
        .then(() => {
           return loadTemplate('about', {
                quote: {
                    title: 'Created by',
                    subtitle: 'Nikolay.I.Nachev',
                    profilePic: 'nikolay.jpeg',
                    gradiented: true,
                },
                path: { root: 'Creator', user: true },
                post: { title: 'Nikolay Nachev' },
            });
        })
        .then((aboutTemplate) => {
            $appContainer.html(aboutTemplate);

            setActiveLink( 'About' );
        });
}

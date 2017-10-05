/* globals $ */

import { load as loadTemplate } from 'templates';
import { registerCarousel } from 'carouselHelper';
import { registerQuote } from 'quoteHelper';

const $appContainer = $('#app-container');

export function get(params) {
    return Promise.all( [
        registerCarousel(),
        registerQuote(),
    ])
        .then( () => {
            return Promise.all( [
                $.get('/api/v1/posts?random=4'),
                $.get('/api/v1/quotes?random=1'),
            ]);
        })
        .then( ([carouselPosts, quotes]) => {
            return loadTemplate( 'home', { carouselPosts, quote: quotes[0] } );
        })
        .then( ( homeTemplate ) => {
            $appContainer.html(homeTemplate);
            $('.carousel').carousel({
                interval: 5000,
              });
        });
}

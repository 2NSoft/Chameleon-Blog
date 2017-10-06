/* globals $ */

import { load as loadTemplate } from 'templates';
import { registerCarousel } from 'carouselHelper';
import { registerQuote } from 'quoteHelper';
import { registerCard } from 'cardHelper';

const $appContainer = $('#app-container');

export function get(params) {
    return Promise.all( [
        registerCarousel(),
        registerQuote(),
        registerCard(),
    ])
        .then( () => {
            return Promise.all( [
                $.get('/api/v1/posts?random=4'),
                $.get('/api/v1/quotes?random=1'),
                $.get('/api/v1/posts?random=3'),
            ]);
        })
        .then( ([carouselPosts, quotes, cards]) => {
            return loadTemplate( 'home', {
                carouselPosts,
                quote: quotes[0],
                cards } );
        })
        .then( ( homeTemplate ) => {
            $appContainer.html(homeTemplate);
            $('.carousel').carousel({
                interval: 5000,
              });
        });
}

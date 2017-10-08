/* globals $ */

import { load as loadTemplate } from 'templates';
import { registerCarousel } from 'carouselHelper';
import { registerQuote } from 'quoteHelper';
import { registerCard } from 'cardHelper';
import { registerList } from 'listHelper';
import data from 'data';

const $appContainer = $('#app-container');

export function get(router) {
    return Promise.all( [
        registerCarousel(),
        registerQuote(),
        registerCard(),
        registerList(),
    ])
        .then( () => {
            return data.getHomeData();
        })
        .then( ([
            carouselPosts,
            quotes,
            cards,
            quotesWidgetData,
            ]) => {
            return loadTemplate( 'home', {
                carouselPosts,
                quote: {
                    title: quotes[0].quote,
                    subtitle: `by ${quotes[0].author}`,
                    quoted: true,
                },
                cards,
                quotes: {
                    items: quotesWidgetData,
                    type: 'From The Blog',
                },
            } );
        })
        .then( ( homeTemplate ) => {
            $appContainer.html(homeTemplate);
            $('.carousel').carousel({
                interval: 5000,
              });
            $('[data-post]').click( (ev) => {
                const id = $(ev.target).attr( 'data-post' ) ||
                           $(ev.currentTarget).attr( 'data-post' );
                router.navigate(`/blog/${id}`);
            });
        });
}

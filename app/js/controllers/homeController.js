/* globals $ */

import { load as loadTemplate } from 'templates';
import { registerCarousel } from 'carouselHelper';
import { registerQuote } from 'quoteHelper';
import { registerCard } from 'cardHelper';
import { registerList } from 'listHelper';
import data from 'data';

const $appContainer = $('#app-container');

export function get(params) {
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
            recentPosts,
            textWidgetData,
            recentComments,
            ]) => {
            return loadTemplate( 'home', {
                carouselPosts,
                quote: quotes[0],
                cards,
                quotes: {
                    items: quotesWidgetData,
                    type: 'From The Blog',
                },
                posts: {
                    items: recentPosts,
                    type: 'Recent Posts',
                },
                text: {
                    text: textWidgetData[0].text,
                    _id: textWidgetData[0]._id,
                    type: 'Text Widget',
                    skipList: true,
                },
                comments: {
                    items: recentComments,
                    type: 'Recent Comments',
                },
            } );
        })
        .then( ( homeTemplate ) => {
            $appContainer.html(homeTemplate);
            $('.carousel').carousel({
                interval: 5000,
              });
        });
}

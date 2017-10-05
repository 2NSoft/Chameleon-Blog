/* globals $ */

import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function get(params) {
    return $.get('/api/v1/posts?random=4')
        .then( (posts) => {
            return Promise.all([
                loadTemplate( 'home' ),
                loadTemplate( 'carousel', { posts } ),
            ]);
        })
        .then( ( [homeTemplate, carouselTemplate] ) => {
            homeTemplate.replace( '###carousel###', carouselTemplate );
            $appContainer.html(carouselTemplate);
            $('.carousel').carousel({
                interval: 5000,
              });
        });
}

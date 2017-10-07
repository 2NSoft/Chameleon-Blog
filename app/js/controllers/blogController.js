/* globals $ */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';

const $appContainer = $('#app-container');

export function get(params) {
    return Promise.all( [
            data.getBlogData(params.id),
            user.checkStatus(),
        ])
        .then( ([blogData, userData]) => {
            console.log( userData );
            console.log( blogData );
            return loadTemplate( 'blog', {
                userData,
                blogData,
            } );
        })
        .then( ( blogTemplate ) => {
            $appContainer.html(blogTemplate);
        });
}

/* globals $ */

import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function get() {
    return loadTemplate( 'notFound' )
        .then( ( notFoundTemplate ) => {
            $appContainer.html(notFoundTemplate);
        });
}

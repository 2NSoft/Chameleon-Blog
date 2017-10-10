/* globals $ */

import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

export function get() {
    return loadTemplate( 'unauthorized' )
        .then( ( notFoundTemplate ) => {
            $appContainer.html(notFoundTemplate);
        });
}

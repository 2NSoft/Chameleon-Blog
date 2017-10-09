/* globals $ toastr */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';

const $appContainer = $('#app-container');
const $menu = $('.navbar-collapse ul');

export function get(router) {
    let userData;
    return user.checkStatus()
        .then( (_userData) => {
            userData = _userData;
            return loadTemplate('createCategory');
        })
        .then((createCatTemplate) => {
            $appContainer.html(createCatTemplate);

            $menu
                .children()
                .each( (index, item) => {
                    const link = $($(item).find('a').eq(0));
                    if (link.text()==='Blog') {
                        link.addClass('isActive');
                    } else {
                        link.removeClass('isActive');
                    }
                });
        });
}

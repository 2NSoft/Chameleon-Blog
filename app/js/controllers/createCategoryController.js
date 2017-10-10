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
            if (!userData.signedIn) {
                return user.checkStatus(true);
            }
            return loadTemplate('createCategory');
        })
        .then((createCatTemplate) => {
            $appContainer.html(createCatTemplate);
            const $form = $('#category-form');

            $form.submit( (ev)=> {
                ev.preventDefault();
                const formData = {
                    name: $('[name=name]').val(),
                    description: $('[name=description]').val(),
                };
                return data.addCategory( formData )
                    .then((categoryId) => {
                        router.navigate(`/category/${categoryId}`);
                    })
                    .catch((err) => {
                        toastr.error( err, 'Something went wrong!');
                    });
            });

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

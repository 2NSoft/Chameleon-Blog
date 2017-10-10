/* globals $ toastr */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';
import { setActiveLink } from 'setLink';

const $appContainer = $('#app-container');

export function get(router) {
    let userData;
    return user.checkStatus()
        .then( (_userData) => {
            userData = _userData;
            if (!userData.signedIn) {
                return Promise.reject( router.navigate('/unauthorized'));
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

            setActiveLink( 'Blog' );
        });
}

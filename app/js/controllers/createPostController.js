/* globals $ toastr */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';
import dateFormat from 'date';


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
            return data.getCategories();
        })
        .then( (categories) => {
            return loadTemplate('createPost', {
                user: userData,
                categories,
            });
        })
        .then((createPostTemplate) => {
            $appContainer.html(createPostTemplate);
            const $form = $('#post-form');

            $form.submit( (ev)=> {
                ev.preventDefault();
                const formData = new FormData($form.get(0));
                formData.append( 'username', userData.username );
                formData.append( 'userId', userData.id );
                formData.append( 'createdOn', new Date() );
                formData.append( 'categoryName',
                    $('[name=category] > [selected]').text() );
                return data.addPost( formData )
                    .then((postId) => {
                        router.navigate(`/blog/${postId}`);
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
        })
        .catch( (err) => console.log(err));
}

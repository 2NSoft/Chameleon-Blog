/* globals $ */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';
import dateFormat from 'date';
import { registerQuote } from 'quoteHelper';
import { registerLocation } from 'locationHelper';
import { registerComment } from 'commentHelper';
import { registerBlogpost } from 'blogPostHelper';

const $appContainer = $('#app-container');
const $menu = $('.navbar-collapse ul');

export function get(params, router) {
    return Promise.all([
            registerQuote(),
            registerLocation(),
            registerBlogpost(),
            registerComment(),
        ])
        .then(() => {
            return Promise.all([
                data.getBlogData(params.id),
                user.checkStatus(false),
            ]);
        })
        .then(([
            [
                blogData,
                fromTheBlogData,
                archivesData,
                recentPostsData,
            ],
            userData,
        ]) => {
            let date = new Date(blogData.createdOn);
            date = dateFormat(date, 'mmm dd, yyyy');
            blogData.createdOn = date;
            blogData.titless = true;
            blogData.comments = {
                comments: blogData.comments || [],
                length: blogData.comments ? '' + blogData.comments.length : '0',
            };
            blogData.comments.comments =
                blogData.comments.comments.map( (comment) => {
                    comment.createdOn =
                        dateFormat( new Date(comment.createdOn),
                                    'mmm dd, yyyy');
                    return comment;
                } );
            return loadTemplate('blog', {
                quote: {
                    title: blogData.title,
                    subtitle: `Posted by ${blogData.author.name} on ${blogData.createdOn} in ${blogData.category.name}`, // eslint-disable-line max-len
                    gradiented: true,
                },
                path: `Home » ${blogData.category.name} » `,
                post: blogData,
                quotes: {
                    items: fromTheBlogData,
                    type: 'From The Blog',
                    vertical: true,
                },
                archives: {
                    items: archivesData,
                    type: 'Archives',
                    vertical: true,
                },
                recentPosts: {
                    items: recentPostsData,
                    type: 'Recent Posts',
                    vertical: true,
                },
                user: userData,
            });
        })
        .then((blogTemplate) => {
            $appContainer.html(blogTemplate);
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
                $('#signin-btn').click( () => {
                    router.navigate('/sign-in');
                });
        });
}

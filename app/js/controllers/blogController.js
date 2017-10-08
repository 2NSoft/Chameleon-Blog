/* globals $ */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';
import dateFormat from 'date';
import { registerQuote } from 'quoteHelper';
import { registerLocation } from 'locationHelper';

const $appContainer = $('#app-container');
const menu = $('.navbar-collapse ul');

export function get(params) {
    return Promise.all([
            registerQuote(),
            registerLocation(),
        ])
        .then(() => {
            return Promise.all([
                data.getBlogData(params.id),
                user.checkStatus(),
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
            return loadTemplate('blog', {
                quote: {
                    title: blogData.title,
                    subtitle: `Posted by ${blogData.author.name} on ${date} in ${blogData.category.name}`, // eslint-disable-line max-len
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
            });
        })
        .then((blogTemplate) => {
            $appContainer.html(blogTemplate);
            menu
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

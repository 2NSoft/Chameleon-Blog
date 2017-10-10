/* globals $ toastr */

import { load as loadTemplate } from 'templates';
import data from 'data';
import dateFormat from 'date';
import { registerQuote } from 'quoteHelper';
import { registerLocation } from 'locationHelper';
import { registerBlogpost } from 'blogPostHelper';

const $appContainer = $('#app-container');
const $menu = $('.navbar-collapse ul');

export function get(params, query, router) {
    const parsedQuery = {};
    query
        .split('&')
        .forEach( (param) => {
            param = param.split('=');
            parsedQuery[param[0]] = param[1];
        });

    const pageSize = parsedQuery.pagesize || 3;
    const pageNumber = parsedQuery.pagenumber || 1;
    return Promise.all([
            registerQuote(),
            registerLocation(),
            registerBlogpost(),
        ])
        .then(() => {
            return data.getUserData(params.id, pageSize, pageNumber);
        })
        .then(([
                [userData, posts],
                fromTheBlogData,
                archivesData,
                recentPostsData,
            ]) => {
            posts = posts.map( (blogData) => {
                let date = new Date(blogData.createdOn);
                date = dateFormat(date, 'mmm dd, yyyy');
                blogData.createdOn = date;
                blogData.comments = {
                    comments: blogData.comments || [],
                    length: blogData.comments ? '' + blogData.comments.length : '0', // eslint-disable-line max-len
                };
                blogData.comments.comments =
                    blogData.comments.comments.map( (comment) => {
                        comment.createdOn =
                            dateFormat( new Date(comment.createdOn),
                                        'mmm dd, yyyy');
                        return comment;
                    } );
                blogData.boxed = true;
                return blogData;
            });
            const pages = [];
            const pageCount = Math.ceil( userData.postCount / pageSize );
            for ( let i = 1; i <= pageCount; i += 1 ) {
                pages.push( {
                    href: `/user/${userData._id}?pagenumber=${i}`,
                    index: i,
                });
            }
            return loadTemplate('user', {
                quote: {
                    title: userData.username,
                    subtitle: `${userData.postCount} Posts`,
                    profilePic: userData.profilePic,
                    gradiented: true,
                },
                path: { root: 'Users', user: true },
                post: { title: userData.username },
                posts,
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
                pages,
            });
        })
        .then((categoryTemplate) => {
            $appContainer.html(categoryTemplate);
            $menu
                .children()
                .each( (index, item) => {
                    $(item).removeClass('isActive');
                });
                $('.user-read-btn')
                    .each( (index, btn) => {
                        $(btn).click( () => {
                            const postId = $(btn).attr('data-post');
                            router.navigate(`/blog/${postId}`);
                    });
                });
                $('.page-link')
                    .each( (index, btn) => {
                        const $btn = $(btn);
                        if ($btn.text() === pageNumber ) {
                            $btn.addClass('isActive');
                        }
                        $btn.click( () => {
                            const pageQuery = $(btn).attr('data-page');
                            router.navigate(pageQuery);
                    });
                });
        });
}

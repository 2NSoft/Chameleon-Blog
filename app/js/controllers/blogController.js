/* globals $ toastr */

import { load as loadTemplate } from 'templates';
import user from 'user';
import data from 'data';
import dateFormat from 'date';
import { registerQuote } from 'quoteHelper';
import { registerLocation } from 'locationHelper';
import { registerComment } from 'commentHelper';
import { registerBlogpost } from 'blogPostHelper';

const $appContainer = $('#app-container');

export function get(params, router) {
    let postId;
    let userData;
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
            _userData,
        ]) => {
            postId = blogData._id;
            userData = _userData;
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
            blogData.category.root = 'Home';
            return loadTemplate('blog', {
                quote: {
                    title: blogData.title,
                    subtitle: `Posted by ${blogData.author.name} on ${blogData.createdOn} in ${blogData.category.name}`, // eslint-disable-line max-len
                    gradiented: true,
                },
                path: blogData.category,
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

                $('#signin-btn').click( () => {
                    router.navigate('/sign-in');
                });
                $('#comment-send-btn').click( (ev) => {
                    ev.preventDefault();
                    const commentData = {
                        comment: $('#comment-message').val(),
                        time: new Date(),
                        user: userData,
                        postId: postId,
                    };
                    if (!commentData.comment &&
                            commentData.comment.length < 10) {
                        toastr.error('Comment message should be at least 10 symbols!'); // eslint-disable-line max-len
                        return false;
                    }
                    return data.addComment( commentData )
                        .then(()=>{
                            window.location.reload();
                        })
                        .catch( (err) => {
                            toastr.error( err.message,
                                'Could not send comment!');
                        });
                });
        });
}

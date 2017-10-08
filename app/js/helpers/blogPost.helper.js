/* globals $ */
import Handlebars from 'handlebars';

const registerBlogpost = () => {
    return $.get(`templates/blogPost.handlebars`)
        .then( (template) => {
            return Promise
                .resolve( Handlebars.registerPartial('blogPost', template ));
        });
};

module.exports = { registerBlogpost };

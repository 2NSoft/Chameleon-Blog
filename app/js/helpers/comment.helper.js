/* globals $ */
import Handlebars from 'handlebars';

const registerComment = () => {
    return $.get(`templates/comment.handlebars`)
        .then( (template) => {
            return Promise
                .resolve( Handlebars.registerPartial('comment', template ));
        });
};

module.exports = { registerComment };

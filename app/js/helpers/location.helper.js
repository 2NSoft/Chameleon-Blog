/* globals $ */
import Handlebars from 'handlebars';

const registerLocation = () => {
    return $.get(`templates/location.handlebars`)
        .then( (template) => {
            return Promise
                .resolve( Handlebars.registerPartial('location', template ));
        });
};

module.exports = { registerLocation };

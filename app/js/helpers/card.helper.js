/* globals $ */
import Handlebars from 'handlebars';

const registerCard = () => {
    return $.get(`templates/card.handlebars`)
        .then( (template) => {
            return Promise
                .resolve( Handlebars.registerPartial('card', template ));
        });
};

module.exports = { registerCard };

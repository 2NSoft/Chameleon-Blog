/* globals $ */
import Handlebars from 'handlebars';

const registerList = () => {
    return $.get(`templates/list.handlebars`)
        .then( (template) => {
            return Promise
                .resolve( Handlebars.registerPartial('list', template ));
        });
};

module.exports = { registerList };

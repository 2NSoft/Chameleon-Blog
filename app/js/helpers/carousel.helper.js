/* globals $ */
import Handlebars from 'handlebars';

const registerCarousel = () => {
    return $.get(`templates/carousel.handlebars`)
        .then( (template) => {
            return Promise
                .resolve( Handlebars.registerPartial('carousel', template ));
        });
};

module.exports = { registerCarousel };

const passport = require( 'passport' );

const attach = (app, data) => {
    const controller = require( './controller' ).init( data );
    // app.get( '/api/v1/towns', ( req, res ) => {
    //     return controller.getTowns( req, res );
    // } );
};

module.exports = attach;

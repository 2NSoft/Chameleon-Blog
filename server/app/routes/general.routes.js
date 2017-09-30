
const attach = (app) => {
    app.get('/404', (req, res) => {
        res.send( 'Page not found' );
    });
};

module.exports = attach;


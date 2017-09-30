
const attach = (app) => {
    app.get('/', (req, res) => {
        res.render('general/home.pug');
    });
};

module.exports = attach;


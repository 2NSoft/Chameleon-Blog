const Users = require('./user.data.js');
const Posts = require('./post.data.js');


const init = (db) => {
    return {
         users: new Users(db),
         posts: new Posts(db),
    };
};

module.exports = { init };

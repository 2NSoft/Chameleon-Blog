const Users = require('./user.data.js');
const Posts = require('./post.data.js');
const Comments = require('./comment.data.js');

const init = (db) => {
    return {
         users: new Users(db),
         posts: new Posts(db),
         comments: new Comments(db),
    };
};

module.exports = { init };

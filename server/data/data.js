const Users = require('./user.data.js');
const Posts = require('./post.data.js');
const Comments = require('./comment.data.js');
const Categories = require('./category.data.js');

const init = (db) => {
    return {
         users: new Users(db),
         posts: new Posts(db),
         comments: new Comments(db),
         categories: new Categories(db),
    };
};

module.exports = { init };

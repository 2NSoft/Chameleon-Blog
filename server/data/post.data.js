const BaseData = require('./base.data.js');
const Post = require('../models/post.model.js');

class Posts extends BaseData {
    constructor( db ) {
        super(db, Post, Post);
    }
}

module.exports = Posts;

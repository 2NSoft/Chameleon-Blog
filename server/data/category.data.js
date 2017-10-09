const BaseData = require('./base.data.js');
const Category= require('../models/category.model.js');

class Categories extends BaseData {
    constructor( db ) {
        super(db, Category, Category);
    }
}

module.exports = Categories;

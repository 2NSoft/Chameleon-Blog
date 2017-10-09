const Validator = require( '../utils/validator' );

class Category {
    static isValid(model) {
        if ( !Validator.validateCategory( model ) ) {
            return false;
        }
        return true;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Category();
        Object.keys(model)
            .forEach( (key) => {
                viewModel[key] = model[key];
            });
        return viewModel;
    }
}

module.exports = Category;

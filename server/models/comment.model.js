const Validator = require( '../utils/validator' );

class Comment {
    static isValid(model) {
        if ( !Validator.validateComment( model ) ) {
            return false;
        }
        return true;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Comment();
        Object.keys(model)
            .forEach( (key) => {
                viewModel[key] = model[key];
            });
        return viewModel;
    }
}

module.exports = Comment;

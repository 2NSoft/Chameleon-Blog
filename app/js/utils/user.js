/* globals $*/
/* eslint-disable no-undefined */
class User {
    constructor() {
        this.userName = undefined;
        this.id = undefined;
        this.email = undefined;
        this.signedIn = undefined;
    }
    _setUser(userData) {
        this.signedIn = !!userData;
        if (this.signedIn) {
            this.userName = userData.username;
            this.id = userData.id;
            this.email = userData.email;
        } else {
            this.userName = undefined;
            this.id = undefined;
            this.email = undefined;
        }
        if (this.onStatusChange) {
            this.onStatusChange(this);
        }
    }
    checkStatus() {
        $.get('/api/v1/auth')
            .then((userData) => {
                this._setUser(userData);
            })
            .catch(() => {
                this._setUser(null);
            });
    }
    signIn(userSignInData) {
        $.post('/api/v1/auth', userSignInData)
            .then((userData) => {
                this._setUser(userData);
            })
            .catch(() => {
                this._setUser(null);
            });
    }
    signOut() {
        $.ajax( '/api/v1/auth', {
            method: 'DELETE',
        })
            .then( ()=> {
                this._setUser(null);
            })
            .catch( (err) => {
                console.log(err);
            } );
    }
}

const user = new User();

module.exports = user;

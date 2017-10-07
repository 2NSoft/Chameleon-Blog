/* globals $ toastr */
/* eslint-disable no-undefined */
class User {
    constructor() {
        this.userName = undefined;
        this.id = undefined;
        this.email = undefined;
        this.signedIn = undefined;
    }
    _setUser(userData, change=true) {
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
        if (this.onStatusChange && change) {
            this.onStatusChange(this);
        }
    }
    checkStatus() {
        return $.get('/api/v1/auth')
            .then((userData) => {
                this._setUser(userData, false);
                return Promise.resolve( JSON.stringify( this ) );
            })
            .catch(() => {
                this._setUser(null, false);
                return Promise.resolve( JSON.stringify( this ) );
            });
    }
    signIn(userSignInData) {
        $.post('/api/v1/auth', userSignInData)
            .then((userData) => {
                this._setUser(userData);
                toastr.success(`Welcome: ${this.userName}`);
            })
            .catch((err) => {
                this._setUser(null);
                toastr.error(err.responseText);
            });
    }
    signOut() {
        $.ajax( '/api/v1/auth', {
            method: 'DELETE',
        })
            .then( ()=> {
                toastr.success(`You have successfully signed out!`);
                this._setUser(null);
            })
            .catch( (err) => {
                toastr.error(err.responseText);
            } );
    }
}

const user = new User();

module.exports = user;

const moment = require("moment");
const shortid = require("shortid");
const bcrypt = require('bcryptjs');
const elas = require ('../elastic/index');


class Register {
    constructor(){};

    register ( email, password ) {
        return new Promise ( (resolve, reject) => {
            this.isEmailExist (email)
            .then ( status => {
                // Email available
                if ( !status ) {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash( password, salt, function(err, hash) {
                            let user = {
                                id : shortid.generate(),
                                email : email,
                                password : hash,
                                date : moment().format("DD/MM/YYYY")
                            }
                            elas.insertDocument ('passport', 'users', user)
                            .then ( data => {
                                resolve ( true ); 
                            });
                        });
                    });
                } else {
                    reject ( false ); 
                }
            });
        });    
    }

    isEmailExist ( email ) {
        return new Promise ( (resolve, reject) => {
            elas.searchAll ( 'passport', 'users')
            .then ( (data) => {
                let n = data.length;
                for (let i = 0; i < n; i++) {
                    // Email existed
                    if (email === data[i]['email']) {
                        resolve (true);
                    }
                }
                resolve (false);
            });
        });
    }
};

module.exports = new Register ();
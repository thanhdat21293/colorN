const elas = require("../elastic/index");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const passportJWT = require("passport-jwt");
const Promise = require('bluebird');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
let jwtOptions = {
  jwtFromRequest : ExtractJwt.fromAuthHeader(),
    secretOrKey : 'vequelamvuon'
}

module.exports = {
    authLogin : ( email, password ) => {
        return new Promise ( (resolve, reject) => {
            elas.search ( 'icolor', 'users', email)
            .then ( user => {
                    user = user[0];
                    if (!user || user === 'undefined') {
                        resolve ({err : "No user found"});
                    } else {
                        bcrypt.compare (password, user['password'], ( err, result ) => {
                            if (err) { 
                                resolve ({err : err});
                            }
                            if ( !result ) {
                                resolve ({err : "Incorrect Email or Password"});
                            } 
                            const payload = {id: user.id};
                            const options = {
                                // issuer: 'http://localhost:3001',
                                subject: 'secret micro service',
                                expiresIn: 7200 //Expire in 20 seconds
                            }
                            jwt.sign ( payload, jwtOptions.secretOrKey, options, (err, token) => {
                                if (err) {
                                    resolve ( {err: "Fail to generate jwt token"} );
                                } else {
                                    resolve ({message: "ok", token: token, user : user});
                                }
                            } );  //Ký vào payload sử dụng secretOrKey
                        });
                    }
                },
                err => {
                    resolve ({err : err});
                });
        });
    }
};

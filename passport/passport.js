const elas = require('../elastic/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
                    console.log(user);
                    if (!user || user === 'undefined') {
                        reject ({err : "No user found"});
                    } else {
                        console.log('enter');
                        console.log(password);
                        bcrypt.compare (password, user['password'], ( err, result ) => {
                            if (err) { 
                                console.log('b');
                                reject ({err : err});
                            }
                            if (!result) {
                                console.log('c');
                                reject ({err : "Incorrect Email or Password"});
                            } 
                            console.log('ggg');
                            const payload = {id: user.id, group: "customer"};
                            const token = jwt.sign ( payload, jwtOptions.secretOrKey );  //Ký vào payload sử dụng secretOrKey
                            resolve ({message: "ok", token: token, user : user});
                        });
                    }
                })
                .catch (err => {
                    reject ({err : err});
                });
        });
    }
};

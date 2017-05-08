const collection = require ('../models/collection');
const account = require ('../models/register');

module.exports = function (app, passport) {

    app.get ('/', (req, res) => {
    collection.getAllCollection ()
        .then (data => {
            res.render ('index', {
                data: { dt: data },
                vue: {
                    head: {
                        title: 'Color Pro',
                        meta: [
                            // { script: '/public/js/home/script.js' },
                            { style: '/public/css/home/style.css',type: 'text/css',rel: 'stylesheet' }
                            ],
                        },
                    components: ['myheader']
                }
            });
        });
    });

    app.get('/relate', (req, res) => {
        let id = req.query.id;
        let id_parent = req.query.idparent;
        let hex = "#" + id;
        let arr = [];
        collection.getColorRelated ( hex, id_parent )
        .then ( data => {
            res.json (data);
        });
    });

    app.get ('/detail/:id', (req, res) => {
        let id = req.params.id;
        collection.getCollection (id)
        .then ( (data) => {
            res.render ('detail', {
                data: { collection: data , name : data.name },
                vue: {
                    head: {
                        title: data['name'],
                        meta: [
                                // { script: '/public/js/detail/script.js' },
                                { style: '/public/css/detail/style.css',type: 'text/css',rel: 'stylesheet' }
                            ]
                    },
                    components: ['myheader', 'footerdetail', 'related']
                }
            });
        });
    });

    app.post ('/register', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let status = {};
        account.register ( email, passport )
        .then ( succeed => {
            status = {
                'success' : 'Register succesfull'
            }
        },
        failed => {
            status = {
                'error' : 'Email is already used'
            }
        });
        res.json( status );
    });

    app.post ('/logout', (req, res)=>{
        req.logOut();
        res.redirect('/');
    });

    app.get ('/login', (req, res) => {
        let status = {};
        if ( req.isAuthenticated() ) {
            status = {
                'user' : req.user
            };     
        }
        if ( req.isUnauthenticated() ) {
            status = {
                'error' : 'Email or password is not correct'
            };
        }
        res.json (status);
    });

    app.post ("/login", passport.authenticate('local',{
        successRedirect: '/login',
        failureRedirect: '/login'
    }));

}
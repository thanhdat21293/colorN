const collection = require ('../models/collection');

module.exports = function (app) {

    app.get ('/', (req, res) => {
    collection.getAllCollection ()
        .then (data => {
            res.render ('index', {
                data: { dt: data },
                vue: {
                    head: {
                        title: 'Color Pro',
                        meta: [
                            { script: '/public/js/home/script.js' },
                            { style: '/public/css/home/style.css',type: 'text/css',rel: 'stylesheet' }
                            ],
                        },
                    components: ['headerhome', 'footeritem']
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
                                { script: '/public/js/detail/script.js' },
                                { style: '/public/css/detail/style.css',type: 'text/css',rel: 'stylesheet' }
                            ]
                    },
                    components: ['headerdetail', 'footerdetail', 'related']
                }
            });
        });
    });
}
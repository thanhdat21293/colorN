const elas = require('../elastic/index');
const async = require("async");
const convert = require("color-convert");
const core = require("./core");
const Promise = require("bluebird");
const quickSort = require('./quicksort');

class Collection {
    constructor(){}

    getAllCollection () {
        let that = this;
        return new Promise ( (resolve, reject) => {
            elas.searchAll ( "icolor2", "collection" )
            .then ( (data) => {
                async.map (data, that.getAuthor, (err, result) => {
                    async.map (data, that.getLikeAndDislike, (err, result) => {
                        resolve (result);
                    });
                });
            });
        });
    }

    getAuthor (item, cb) {
        elas.search ("icolor2", "users", item['id_user'])
        .then ( (data) => {
            item['author'] = data[0]['name'];
            item['author_email'] = data[0]['email'];
            cb (null, item);
        });
    }

    getLikeAndDislike (item, cb) {
        elas.search ("icolor2", "like_dislike", item['id'])
        .then ( (data) => {
            let like = data.filter( (obj) => {
                return obj['status'] === "like";
            }).length;
            let dislike = data.length - like; 
            item['like'] = 0 || like;
            item['dislike'] = 0 || dislike;
            cb (null, item);
        });
    }

    getCollection (id) {
        let that = this;
        return new Promise ( (resolve, reject) => {
            elas.search ("icolor2", "collection", id)
            .then ( (data) => {
                // ES search will return an array
                that.getAuthor ( data[0] , (err, result) => {
                    resolve (result);
                });
            });
        });
    }

    getAllColor() {
        return elas.searchAll ( "icolor2", "color" );
    }

    getColorRelated ( hex, id_parent ) {
        let that = this;
        return new Promise ( (resolve, reject) => {
            // Get all color related
            elas.search ( "icolor2", "color_related", hex )
            .then (data => {
                let n = data.length;
                let arr_id_related = [];
                // Sort by Ascending 
                let sorted = quickSort ( data, 0, n-1 );
                // Get 10 most related
                sorted = sorted.slice ( 0, 10 );
                arr_id_related = that.getIdRelated (sorted, hex);
                that.getCollectionRelated (arr_id_related)
                .then ( (data) => {
                    let arr = [];
                    data.forEach ( (val) => {
                        val.forEach ( (item) => {
                            console.log(item['id']);
                            if ( item['id'] !== id_parent) {
                                arr.push (item);
                            }
                        });
                    });
                    async.mapSeries ( arr, that.getAuthor, (err, result) => {
                        resolve (result);
                    });
                });
            });
        });
    }

    getIdRelated ( arr, id ) {
        let temp = [];
        arr.forEach ( (val) => {
            if (val['id'] === id) {
                temp.push ( val['id_related'] );
            } else {
                temp.push ( val['id'] );
            }
        }) ;
        return temp;
    }

    getCollectionRelated ( colors ) {
        let that = this;
        return new Promise ( (resolve, reject) => {
            async.map (colors, that.findCollection, (err, result) => {
                resolve (result);
            });
        });
    }

    findCollection ( item, cb ) {
        elas.search ( "icolor2", "collection", item)
        .then ( (data) => {
            cb (null, data);
        });
    }

    addCollection( collection ) {
        let that = this;
        return new Promise ( (resolve, reject) => {
            elas.insertDocument ( "icolor2", "collection", collection )
            .then (() => {
                let arr = [collection['color1'], collection['color2'], collection['color3'], collection['color4'], collection['color5']];

                that.addColor ( arr)
                .then ( data => {
                    resolve ( "Insert succeed" );
                });
            });
        });
    }

    addColor ( arrColor ) {
        let that = this;
        console.log(arrColor);
        return new Promise (( resolve, reject ) => {
            function demo ( item, cb ) {
                that.checkColorExist ( item )
                .then (( data ) => {
                    cb ( null, data );
                });
            }
            async.mapSeries ( arrColor, demo, ( err, result ) => {
                resolve ( result );
            });
        });
    }

    checkColorExist ( color ) {   
        let that = this;
        return new Promise (( resolve, reject ) => {
            elas.search ( "icolor2", "color", color )
            .then (data => {
                console.log(data.length);
                if ( !data.length ) {
                    let temp = {
                        "id" : color
                    }
                    elas.insertDocument ( "icolor2", "color", temp )
                    .then (data =>{
                        that.findColorSimilar ( color )
                        .then ( data => {
                            resolve ( data );
                        });
                    });
                } else {
                    resolve ( color );
                }
            });
        });
    }

    findColorSimilar ( color1 ) {
        return new Promise (( resolve, reject ) => {
            this.getAllColor ()
            .then (data => {
                data.forEach( ( color2 ) => {
                        let temp1 = {};
                        let temp2 = {};
                        let lab1 = convert.hex.lab ( color1 );
                        let lab2 = convert.hex.lab ( color2['id'] );
                        let distance = core.DeltaECIE ( lab1, lab2 );

                        temp1['id'] = color1;
                        temp1['id_related'] = color2 ['id'];
                        temp1['_score'] = distance;

                        elas.insertDocument ( "icolor2", "color_related", temp1 ).then (()=>{
                            resolve ( "OK" );
                        });
                });
            });
        });
    }
}

module.exports = new Collection();

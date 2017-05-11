const elas = require('../elastic/index');
const async = require("async");
const convert = require("color-convert");
const core = require("./core");
const Promise = require("bluebird");
const quickSort = require('./quicksort');

class Likedislike {
    constructor(){}

    getLikeAndDislike (item, cb){
        elas.search ("icolor", "like_dislike", item['id'])
        .then ( (data) => {
            let like = data.filter( (obj) => {
                return obj['status'] === "like";
            }).length;
            let dislike = data.length - like;
            item['like'] = 0 || like;
            item['dislike'] = 0 || dislike;
            cb (null, item);
        },
        error => {
            cb (null, item);
        });
    }

    checkLikeDislike(collection_id, user_id, status){
        elas.search ("icolor", "like_dislike", item['id'])
            .then ( (data) => {
                let like = data.filter( (obj) => {
                    return obj['status'] === "like";
                }).length;
                let dislike = data.length - like;
                item['like'] = 0 || like;
                item['dislike'] = 0 || dislike;
                cb (null, item);
            },
            error => {
                cb (null, item);
            });
    }

    addLike (data) {
        elas.insertDocument ("icolor", "like_dislike", data)
        .then ((data) => {
            console.log(data);
        });
    }
}

module.exports = new Likedislike();
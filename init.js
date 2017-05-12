/*
* Author : nguyenpham93
* This file is to create and add data to Elasticsearch
*/

const elas = require("./elastic/index");
const moment = require("moment");
const shortid = require("shortid");
const data = require("./data.json");
const async = require("async");
const coll = require("./models/collection");
const bcrypt = require('bcrypt-nodejs');
//Create Index
// function createIndex () {
//     elas.createIndex("icolor",(err,stt)=>{
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(stt);
//         }
//     });
// }
// createIndex();

//
//Delete Index

// function deleteIndex () {
//     elas.deleteIndex("icolor",(err, stt)=>{
//         if (err) console.log(err);
//         else console.log(stt);
//     });
// }
//  deleteIndex();
//
// Merge Data into ElasticSearch
// function initData() {
//     let colors = [];
//     for (let count in data) {
//         delete data[count].key;
//         delete data[count].key1;
//         data[count].id = shortid.generate();
//         data[count].name = data[count]['string'];
//         delete data[count]["string"];
//         data[count].color1 = data[count]['array'][0];
//         data[count].color2 = data[count]['array'][1];
//         data[count].color3 = data[count]['array'][2];
//         data[count].color4 = data[count]['array'][3];
//         data[count].color5 = data[count]['array'][4];
//         delete data[count]["array"];
//         data[count].date = moment().format("DD/MM/YYYY");
//         data[count].description = "Color collection";
//         data[count]['id_user'] = "rJBkgtYyb";
//         delete data[count].author;
//         delete data[count].author_email;
//         data[count].share = 0;
//         colors.push(data[count]);
//     }
//     let cutarr = colors.slice (0,5);
//     async.mapSeries (colors, merge, (err, rs) => {
//         console.log("Completed All");
//     });
// }
//
//  initData();
// //
// function merge(item, cb){
//     coll.addCollection(item)
//     .then (data => {
//         console.log(data);
//         cb(null,data);
//     },
//     error => {
//         console.log(error);
//         cb (null, error);
//     });
// }

// // Add add Author
// let author = {
//     "id" :  'rJBkgtYyb',
//     //"id" :  shortid.generate(),
//     // "name" : "The Shepherd's Man",
//     "email" : "s3408985@gmail.com",
//     "password" : "rootvn",
//     // "description" : "Nodejs programmer",
//     // "website" : "https://www.icolor.com",
//     "data" :  moment().format("DD/MM/YYYY")
// };
//
// function addAuthor (author){
//     // bcrypt.genSalt(10, function(err, salt) {
//     //     bcrypt.hash(author['password'], salt, function(err, hash) {
//     //         author['password'] = hash;
//     //         elas.insertDocument ("icolor", "users", author)
//     //         .then ((data) => {
//     //             console.log(data);
//     //         });
//     //     });
//     // });
//
//     bcrypt.hash(author['password'], null, null, function(err, hash) {
//         author['password'] = hash;
//             elas.insertDocument ("icolor", "users", author)
//             .then ((data) => {
//                 console.log(data);
//             });
//     });
// }
// addAuthor(author);

//
// let collection = {
//     id: shortid.generate(),
//     name: "The Shepherd's Boy",
//     color1: '#FE4365',
//     color2: '#036564',
//     color3: '#B38184',
//     color4: '#F77825',
//     color5: '#E6AC27',
//     date: moment().format("DD/MM/YYYY"),
//     description: 'Pro color',
//     id_user: 'rJBkgtYyb',
//     share: 0
// }
//
// function addCollection2 (collection){
//     coll.addCollection(collection)
//     .then (data => {
//         console.log(data);
//     },
//     error => {
//         console.log (error);
//     });
// }
// // addCollection2(collection);
//
//
// function deleteDocument (){
//     elas.deleteDocument ("icolor","users", "rJBkgtYyb")
//     .then ( data => {
//         console.log (data);
//     },
//     err => {
//         console.log (err);
//     });
// }
// // deleteDocument();
//
// // Add Like & Dislike
// let like = {
//     "id_collection" : "rkBcdCs-gb",
//     "id_user"  : "rJBkgtYyb",
//     "status"   : "dislike",
//     "date"     : moment().format("DD/MM/YYYY")
// }
//
// function addLike () {
//     elas.insertDocument ("icolor", "like_dislike", like)
//     .then ((data) => {
//         console.log(data);
//     });
// }
//  addLike();
//
// // Search ALl for test
function searchAll (){
elas.searchAll("icolor","like_dislike")
 .then (data => {
     console.log(data);
 });
}
searchAll();
//
// function search (){
// elas.search("icolor","like_dislike", '["HyVBt2HbeW", "r1QCo_xkb"]')
//  .then (data => {
//      console.log(data);
//  });
// }
// search();
//
// // elas.search("icolor","users", 'blueeasd222@gmail.com')
// // .then (data => {
// //     console.log(data);
// // },
// // error => {
// //     console.log('cc');
// //     console.log(error);
// // });
// // let email = 'blueeasd222@gmail.com';
// elas.search ( 'icolor', 'collection', 's3408985@gmail.com')
//             .then ( user => {
//                    console.log(user);
//                 },
//                 err => {
//                     console.log(err);
//                 });



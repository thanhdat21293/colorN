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
const elas2 = require("./elastic/connect");
//Create Index
function createIndex () {
    elas.createIndex("icolor2",(err,stt)=>{
        if (err) {
            console.log(err);
        } else {
            console.log(stt);
        }
    });
}
 //createIndex();

//Delete Index
function deleteIndex () {
    elas.deleteIndex("icolor2",(err, stt)=>{
        if (err) console.log(err);
        else console.log(stt);
    });
}
 //deleteIndex();

// Merge Data into ElasticSearch
function initData() {
    let colors = [];
    for (let count in data) {
        delete data[count].key;
        delete data[count].key1;
        data[count].id = shortid.generate();
        data[count].name = data[count]['string'];
        delete data[count]["string"];
        data[count].color1 = data[count]['array'][0];
        data[count].color2 = data[count]['array'][1];
        data[count].color3 = data[count]['array'][2];
        data[count].color4 = data[count]['array'][3];
        data[count].color5 = data[count]['array'][4];
        delete data[count]["array"];
        data[count].date = moment().format("DD/MM/YYYY");
        data[count].description = "Color collection";
        data[count]['id_user'] = "rJBkgtYyb";
        delete data[count].author;
        delete data[count].author_email;
        data[count].share = 0;
        colors.push(data[count]);
    }
    let cutarr = colors.slice (0,50);
    async.mapSeries(colors, merge, (err, rs) => {
        console.log("Completed All");
    });
}

initData();

function merge(item, cb){
    coll.addCollection(item)
    .then (data => {
        console.log(data);
        cb(null,data);
    });
}

// Add add Author
let author = {
    "id" :  shortid.generate(),
    "name" : "bluevn",
    "email" : "blueevn@gmail.com",
    "password" : "secret",
    "description" : "Nodejs programmer",
    "website" : "https://www.icolor2.com",
    "data" :  moment().format("DD/MM/YYYY")
}

function addAuthor (author){
    elas.insertDocument ("icolor2", "users", author)
    .then ((data) => {
        console.log(data);
    });
}
// addAuthor(author);

let collection = {
    id: shortid.generate(),
    name: "The Shepherd's Boy",
    color1: '#8FBE00',
    color2: '#F02475',
    color3: '#CFBE27',
    color4: '#33605A',
    color5: '#CFBE27',
    date: moment().format("DD/MM/YYYY"),
    description: 'Pro color',
    id_user: 'B18e7GP1W',
    share: 0
}

function addCollection (collection){
    coll.addCollection(collection)
    .then (data => {
        console.log(data);
    });
}
// addCollection(collection);


function deleteDocument (){
    elas.deleteDocument ("icolor2","collection", "B1xX6bwd1W")
    .then ( data => {
        console.log (data);
    }, 
    err => {
        console.log (err);
    });
}
// deleteDocument();

// Add Like & Dislike
let like = {
    "id_collection" : "H18Eg10dgk-",
    "id_user"  : "r1QCo_xkb",
    "status"   : "like",
    "date"     : moment().format("DD/MM/YYYY")
}

function addLike () {
    elas.insertDocument ("icolor2", "like_dislike", like)
    .then ((data) => {
        console.log(data);
    });
}
// addLike();

// Search ALl for test
 //elas.searchAll("icolor2","color")
 //.then (data => {
 //    console.log(data);
 //});

// elas.search("icolor2","collection", '#FE4365')
// .then (data => {
//     console.log(data);
// });



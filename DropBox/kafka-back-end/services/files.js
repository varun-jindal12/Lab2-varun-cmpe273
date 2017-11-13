var fs = require('fs');
var mongo = require('./mongo');
var connectOnce = require('connect-once');
var MongoClient = require('mongodb').MongoClient;

var connection = new connectOnce({
    retries: 60,
    reconnectWait: 1000
}, MongoClient.connect, 'mongodb://localhost:27017');

function handle_getFiles(msg,callback) {
    var owner = msg.user;
    var res={};
    console.log("msg contains: "+JSON.stringify(msg));
        connection.when('available', function (err, db) {
        db.collection('files').find({owner:owner}).toArray(function(err,results){
            if(err){
                res.code = "401";
                res.value = "get files failed";
                console.log("file result: ");
                console.log(results);
                callback(null,res);
            }
            res.code = "200";
            res.value = "get files successfully";
            res.data = results;
            console.log("file result :");
            console.log(res);
            callback(null,res);

        })
            /*.then(function(result){
                res.code = "200";
                res.value = "get files successfully";
                res.data = result;
                console.log("file result "+res);
                callback(null,res);
            })
            .catch( function(err){
                res.code = "401";
                res.value = "get files failed";
                console.log("file result: "+res);
                callback(null,res);
            })*/
    });
};

exports.handle_uploadFile = function(msg,callback) {
    var fileDetails = msg.fileDetails;
    var res={};
    console.log("msg contains: "+JSON.stringify(msg));
    connection.when('available', function (err, db) {
        db.collection('files').insertOne(fileDetails)
            .then(function(result){
                // var res="";
                res.code = "200";
                res.value = "file data inserted";
                res.data = result;
                console.log(result);
                console.log("file result "+res);
                callback(null,res);
            })
            .catch( function(err){
                // var res="";
                res.code = "401";
                res.value = "file data not inserted";
                console.log("file result: "+res);
                callback(null,res);
            });
    });
};

exports.handle_getFiles = handle_getFiles;
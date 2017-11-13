var mongodb = require('mongodb');
var dbConn =  mongodb.MongoClient.connect('mongodb://localhost:27017',{poolSize:20});
var bcrypt = require('bcrypt');

function handle_login(msg, callback){

    var res = {};
    query = {emailID:msg.username};
    password = msg.password;
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log("query: "+JSON.stringify(query)+" password: "+password);
    dbConn.then(function(db){
        db.collection('myPassportApp')
            .findOne(query)
            .then(function(result) {
                console.log(result);
                if(result) {
                    if (bcrypt.compareSync(password, result.userPass)) {
                        // if (password === result.password) {
                        res.code = "200";
                        res.value = "Success Login";
                        res.data = result;
                        console.log("res: " + res);
                        callback(null, res);
                        // done(null,{username:result.username,password:result.password,name:result.firstName+" "+result.lastName});
                    }
                    else {
                        res.code = "401";
                        res.value = "Failed Login";
                        console.log("login failed dude!");
                        callback(null, res);
                    }
                }
                else{
                    res.code = "401";
                    res.value = "Failed Login";
                    console.log("no user found !"+err);
                    callback(null, res);
                }
            })
            .catch( function(err){
                res.code = "401";
                res.value = "Failed Login";
                console.log("connection to the DB failed !"+err);
                callback(null, res);
            });
    });
    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
}

exports.handle_login = handle_login;
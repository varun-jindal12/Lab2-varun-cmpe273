var mongodb = require('mongodb');
var dbConn =  mongodb.MongoClient.connect('mongodb://localhost:27017');
var bcrypt = require('bcrypt');

function handle_register(msg,callback) {

    console.log("in register");
    console.log(JSON.stringify(msg));
    var user = msg.user;
    var res = {};
    user.userPass = bcrypt.hashSync(user.userPass,10);
    console.log("body contains: "+msg.user);

    dbConn.then(function(db){
        db.collection('myPassportApp').insertOne(user)
            .then(function(result){
                res.code = "200";
                res.value = "Success Login";
                res.data = user;
                console.log("register result: "+res);
                callback(null,res);
            })
            .catch( function(err){
                res.code = "401";
                res.value = "Failed Login";
                res.data = user;
                console.log("register result: "+res);
                callback(null,res);
            });
    });
};

exports.handle_register = handle_register;
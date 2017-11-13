var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var mongoSessionURL = "mongodb://localhost:27017/sessions";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
var kafka = require('./routes/kafka/client');
var fs = require('fs');
var app = express();
var files = require('./routes/files');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/files',files);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

app.post('/login', function(req, res) {
    passport.authenticate('login', function(err, user) {
        // console.log("error: "+err+ " user: "+user);
        if(err) {
            res.status(500).send({error:err,value:"some error occurred"});
        }

        if(!user) {
            res.status(401).send({error:"user not found"});
        }else {
            // console.log(JSON.stringify(user))
            req.session.user = user.results.data.emailID;
            // console.log(req.session.user);
            // console.log("session initilized");
            return res.status(200).send({userData:user.results.data,status:200});
        }
    })(req, res);
});

app.post('/register', function(req, res) {
    var fullPath = __dirname+'\\public\\files\\'+req.body.emailID+'_dir';
    req.body.fullPath = fullPath;
    kafka.make_request('login_topic',{"user":req.body,"type":"register"}, function(err,results){
        console.log('in register result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){

                var dir = './public/files/'+req.body.emailID+'_dir';

                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                }
                return res.status(200).send({username: req.body.emailID,name:req.body.firstName +" "+req.body.lastName});
            }
            else {
                res.status(401).send();
            }
        }
    });
});

app.post('/getDir', function(req, res) {
    kafka.make_request('login_topic',{"dirName":req.body,"type":"dirList"}, function(err,results){
        console.log('in dirList result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                return res.status(201).send({List: results.list});
            }
            else {
                res.status(401).send();
            }
        }
    });
});

module.exports = app;

var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var kafka = require('./kafka/client');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("desination req contains:");
        // console.log(req);
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        console.log("this is filename"+JSON.stringify(file));
        cb(null, file.originalname)
    }
});
var upload = multer({storage:storage});

router.post('/listFiles', function(req, res) {
    var owner = req.body.emailID;
    kafka.make_request('login_topic',{"user":owner,"type":"getFiles"}, function(err,results){
            console.log('in dirList result');
            console.log(results);
            if(err){
                res.status(500).send();
            }
            else
            {
                if(results.code == 200){
                    return res.status(200).send({files: results.data});
                }
                else {
                    res.status(401).send();
                }
            }
        });
});

router.post('/upload',upload.single('file'), function(req, res) {
    var fileName = req.file.filename;
    var publicDir = './public/uploads/'+fileName;
    var destinationDir = './public/files/'+req.body.user+"_dir/";
    var mongoPath = 'http://localhost:3005/files/'+req.body.user+"_dir/"+fileName;
    var fileDetails = {owner:req.body.user
                      ,coowner:""
                      ,fileName:fileName
                      ,path:mongoPath
                      ,uploadDate:new Date()};
    console.log("file details are:"+JSON.stringify(fileDetails));
    console.log("req body:");console.log(JSON.stringify(req.body.user));
    if (!fs.pathExistsSync(destinationDir)){
        res.status(401).send({error:"Directory not found"});
    }
    console.log("path1"+publicDir+"path2"+destinationDir+fileName);
    fs.move(publicDir,destinationDir+fileName, function (err) {
        if (err) {
            console.error(err);
            console.log("directory does not exists")
            res.status(401).send({error:"could not move the file to destination"});
        }
    });

    kafka.make_request('login_topic',{"fileDetails":fileDetails,"type":"upload"}, function(err,results){
        console.log('in upload result');
        console.log(results);
        if(err){
            res.status(500).send();
        }
        else
        {
            if(results.code == 200){
                return res.status(200).send({List: results.list});
            }
            else {
                res.status(401).send();
            }
        }
    });
});


module.exports = router;

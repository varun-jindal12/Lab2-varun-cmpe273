var fs = require('fs');
function handle_dirList(msg,callback) {
    var response = "";
    console.log("msg contains: "+JSON.stringify(msg));
    var testFolder = msg.dirName.dirName;
    var res = {};
    console.log(testFolder);
    if(testFolder && testFolder !== '') {
        fs.readdir(testFolder, function (err, files) {
            if (err) {
                res.code = "401";
                res.value = "directory not found";
                console.log("listDir result: " + res);
                callback(null, res);
            }
            else {
                console.log(files.length);
                console.log(files);
                /*for (var i = 0; i < files.length; i++) {
                    response += files[i] + "<br>";
                }*/
                res.code = "200";
                res.value = "Directory found";
                res.list = files;
                console.log("listDir result: " + res);
                callback(null, res);
            }
        });
    }else{res.code = "401";
        res.value = "directory not found";
        console.log("listDir result: " + res);
        callback(null, res);}
};

exports.handle_dirList = handle_dirList;
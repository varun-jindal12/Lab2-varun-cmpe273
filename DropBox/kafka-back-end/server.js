var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var register = require('./services/register');
var dirList = require('./services/dirList');
var files = require('./services/files');
var topic_name = 'login_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    if(data.data.type === "login"){
        login.handle_login(data.data, function(err,res){
            // console.log('after login'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                // console.log(data);
            });
            return;
        });
    }
    else if(data.data.type === "register"){
        register.handle_register(data.data, function(err,res){
            console.log('after login'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }
    else if(data.data.type === "dirList"){
        dirList.handle_dirList(data.data, function(err,res){
            console.log('after login'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }
    else if(data.data.type === "getFiles"){
        files.handle_getFiles(data.data, function(err,res){
            console.log('after getFiles'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
    }
    else if(data.data.type === "upload"){
        files.handle_uploadFile(data.data, function(err,res){
            // console.log('after getFiles'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                // console.log(data);
            });
            return;
        });
    }
});
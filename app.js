
var express = require('express');
var fs = require("fs");
var url = require("url");

//create express obj
var app = express();
app.use('/public', express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

//load json files
var word = null;
fs.readFile('word.json', 'utf-8', function(err, data){
    if(err){
	console.log('read file word.json failed');
    }else{
	word = JSON.parse(data);
    }
});


app.get('/', function(req, res){
    //res.sendFile(__dirname + "/" + "index.html");
    //res.send(word.data);
    var body = "";
    word.data.forEach(function(v, i){
	body += "<div>";
	body += "<div>" + i + "</div>";
	body += "<div>" + v.name + "[" + v.phonetic + "]</div>";
	body += "<div>" + v.explanation + "</div>";
	body += "</div>";
    });
    res.render('index', {body: body});
});


app.get('/add', function(req, res){
    //res.sendFile(__dirname + "/" + "add.html");
    res.render('add', {});
});


app.get('/add_handle', function(req, res){
    var params = url.parse(req.url, true).query;
    word.data.push(params)
    res.send("添加成功");
});


var httpServer = app.listen(8000, function(){
    console.log("server running at http://127.0.0.1:8000");
});

		  

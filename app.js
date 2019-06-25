
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
	body += "<div class='word_card'>";
	//body += "<div>" + i + "</div>";
	body += "<div><span class='word_word'>" + v.name + "</span> <span class='word_phonetic'>[" + v.phonetic + "]</span> <a href='modify?w=" + v.name + "'>修改</a></div>";
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


app.get('/modify', function(req, res){
    //console.log("word.data");
    var params = url.parse(req.url, true).query;
    //console.log(params.w)
    var word = "";
    var phonetic = "";
    var explanation = "";
    //for(var i=0; i<word.data.length; i++){
    // 	if(word.data[i].name == params.w){
    // 	    phonetic = word.data[i].phonetic;
    // 	    explanation = word.data[i].explanation;
    // 	    break;
    // 	}
    //}
    var body = "";
    word.data.forEach(function(v, i){
	body += v.name;
    });
    
    res.render('modify', {"name": word, "phonetic": phonetic, "explanation": body});
    
});

app.get('/save_handle', function(req, res){
    var s = JSON.stringify(word);
    fs.writeFileSync('word.json', s);
    res.send("success");
});

var httpServer = app.listen(8000, function(){
    console.log("server running at http://127.0.0.1:8000");
});

		  

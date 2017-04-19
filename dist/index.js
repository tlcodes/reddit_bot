"use strict";

/*// require Express and create Express app
var express = require('express');
var app = express();

// require the body parser to parse json data and urls
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// for testing purpose on the root of app
app.get('/', function(req, res){
  res.send('Get request works!');
});

app.post('/', function(req, res){
  // get the command text
  var text = req.body.text;
  // if we get multiple arguments at the command, we'll need an array:
  // the text is returned as a string only, we'll create an array of strings
/*
  if (!text === ''){
    text = text.split(' ');
    // Now if we get more than one words after the command
    if (text.length > 1) {
      // make a call for a search in the subreddit, for example
    }
    // else, we only got 1 word after the command, that's the subreddit only
    else (text.length === 1) {
      // post a random post from the subreddit
    }
  }
*/
/*
    console.log(text);

  var data = {
    response_type: "ephemeral",
    text: "*RESPONSE TITLE*",
    attachments:[
    {
      text: 'Reddit Bot Speaks!'
    }
    ]};
  res.send(data);
  });

app.listen(9001);
*/
console.log("Tworks");
//# sourceMappingURL=index.js.map
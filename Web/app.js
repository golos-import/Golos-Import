var express = require('express')
var app = express()

const LiveJournal = require('livejournal');
var posts = [];

app.get('/', function (req, res) {
  res.send('<form method="get" action="/parseblog"><div class="input"><span class="label">Your livejournal blog name: </span><input type="text" name="blogname"><input type="submit" value="parse"></div></form>')
})

app.get('/parseblog', function (req, res) {
  var blogname = req.query['blogname'];

  // тут надо сделать вызов функции заполняющей посты
  var fakeData = getFakeData();

  var response = '';

  for (var i = 0; i < 3; i++) {
      response += '<p>' + fakeData[i].subject + '</p>';
  };

  res.send(response)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function getFakeData() {
  var data = [
    {
      subject: "Тема 1",
        post: "Пост 1",
    },
    {
      subject: "Тема 2",
        post: "Пост 2",
    },
    {
      subject: "Тема 3",
        post: "Пост 3",
    }];

    return data; 
}
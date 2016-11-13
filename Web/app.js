var express = require('express')
var app = express()

const LiveJournal = require('livejournal');
var posts = [];

app.get('/', function (req, res) {
  res.send('<form method="get" action="/parseblog"><div class="input"><span class="label">Your livejournal blog name: </span><input type="text" name="blogname"><input type="submit" value="parse"></div></form>')
})

app.get('/parseblog', function (req, res) {
  var blogname = req.query['blogname'];
  var journalName = blogname;

  var response = '<p>Choose posts for importing:</p>';

  var maxId;
  LiveJournal.xmlrpc.getevents({
            journal: journalName,
            auth_method: 'noauth',
            selecttype: 'lastn',
            howmany: 1
        }, function (err, value) {
                maxId = parseInt(value.events[0].itemid);

                LiveJournal.xmlrpc.getevents({
                journal: journalName,
                auth_method: 'noauth',
                selecttype: 'multiple',
                itemids: getIdsString(1, maxId)
                  }, function (err, value) {
                        value.events.forEach(event => {
                          posts.push({
                              id: event.itemid,
                              datetime: event.eventtime,
                              url: event.url,
                              subject: event.subject,
                              post: event.event,
                              tags: event.props.taglist
                          });
                      });

                      //
                        for (var i = 0; i < 10; i++) {
                            response += '<p><input type="checkbox" checked>' + posts[i].subject + '</p>';
                        };

                        response += '<p>Save to Golos.IO blockchain <input type="submit" value="Submit"></p>';
                        res.send(response)

                  });
        });
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

function getAllPosts(journalName){
 
}


function getIdsString(from, to) {
    var res = '';
    for (var i = from; i < to; i++) {
        res += i + ','
    }
    return res + to;
}


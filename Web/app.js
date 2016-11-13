var express = require('express')
var app = express()

const LiveJournal = require('livejournal');
var posts = [];

app.get('/', function (req, res) {
  res.send('<form method="get" action="/parseblog"><div class="input"><span class="label">Your livejournal blog name: </span><input type="text" name="blogname"><input type="submit" value="parse"></div></form>')
})

app.get('/parseblog', function (req, res) {
  var blogname = req.query['blogname'];
  
  getLatestId(blogname, console.err).then((maxId) => {
    if (maxId < 100) {
        getPosts(blogname, 1, maxId)
            .then(parsePosts, console.err)
            .then(()=>res.send(posts));
    } else {
        let i = 0;
        let intervalId = setInterval(()=> {
            if (i <= maxId / 100) {
                let fromId = i * 100 + 1;
                let toId = Math.min(i * 100 + 99, maxId);
                getPosts(blogname, fromId, toId)
                    .then(parsePosts, console.err)
                    .then(() => {
                        if (toId == maxId) {
                            res.send(posts);
                        }
                    });
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    }
  });
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})




function getLatestId(blogname) {
    return new Promise((resolve, reject) => {
        LiveJournal.xmlrpc.getevents({
            journal: blogname,
            auth_method: 'noauth',
            selecttype: 'lastn',
            howmany: 1
        }, function (err, value) {
            if (err) {
                reject(err);
            } else {
                resolve(parseInt(value.events[0].itemid));
            }
        });
    });
}

function getPosts(blogname, fromId, toId) {
    return new Promise((resolve, reject) => {
        //для selecttype: 'multiple' допускается получение не более 99 постов за раз
        LiveJournal.xmlrpc.getevents({
            journal: blogname,
            auth_method: 'noauth',
            selecttype: 'multiple',
            itemids: getIdsString(fromId, toId)
        }, function (err, value) {
            if (err) {
                reject(err);
            } else {
                resolve(value.events);
            }
        });
    });
}

function getIdsString(from, to) {
    var res = '';
    for (var i = from; i < to; i++) {
        res += i + ','
    }
    return res + to;
}



function parsePosts(events) {
    events.forEach(event => {
        posts.push({
            id: event.itemid,
            datetime: event.eventtime,
            url: event.url,
            subject: event.subject,
            post: event.event,
            tags: event.props.taglist
        });
    });
}
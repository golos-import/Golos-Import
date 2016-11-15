var PythonShell = require('python-shell');
var lj = require('./../../LiveJournal/src/lj');
var express = require('express');
var app = express();
app.use("/node_modules", express.static( __dirname + '/../../WebClient/node_modules'));

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname + '/../../WebClient'});
});
app.get('/parseblog', function (req, res) {
    let journalName = req.query['journalName'];
    lj.getAllUserPosts(journalName).then((posts)=> {
        res.send(JSON.stringify(posts));
    });
});
app.get('/postToGolos', function (req, res) {
    let golosPostingKey = req.query['golosPostingKey'];
    let golosNickName = req.query['golosNickName'];
    let subject = req.query['subject'];
    let post = req.query['post'];

    let options = {
        mode: 'text',
        scriptPath: __dirname + '/../../GolosPosting/src',
        args: [golosNickName, golosPostingKey, subject, post]
    };

    PythonShell.run('main.py', options, function (err, results) {
        if (err){
            console.error(options);
            console.error(err);
            res.status(500).send('Something broke!');
        } else {
            res.send("OK");
        }
    });
});

app.listen(3000, function () {
    console.log('Server started on port 3000!');
});

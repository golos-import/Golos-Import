var exec = require('child_process').execFile;
var lj = require('./lj');
var express = require('express');
var app = express();
app.use("/node_modules", express.static("C:\\JSProjects\\Import_to_Golos\\WebClient\\node_modules"));

app.get('/', function (req, res) {
    res.sendFile('C:\\JSProjects\\Import_to_Golos\\WebClient\\index.html');
});
app.get('/parseblog', function (req, res) {
    let journalName = req.query['journalName'];
    journalName = journalName?journalName:'protivoyadie';
    lj.getAllUserPosts(journalName).then((posts)=> {
        res.send(JSON.stringify(posts));
    });
});
app.get('/postToGolos', function (req, res) {
    let golosPostingKey = req.query['golosPostingKey'];
    let golosNickName = req.query['golosNickName'];
    let subject = req.query['subject'];
    let post = req.query['post'];

    exec(`python C:\\JSProject\\Import_to_Golos\\GolosPosting\\src\\main.py ${golosPostingKey} ${golosNickName} ${subject} ${post}`, function(err, data) {
        res.send("OK");
    });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

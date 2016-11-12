const LiveJournal = require('livejournal');
const jsonfile = require('jsonfile');

function getIdsString(from, to) {
    var res = '';
    for (var i = from; i < to; i++) {
        res += i + ','
    }
    return res + to;
}

function getPosts(journalName, fromId, toId) {
    return new Promise((resolve, reject) => {
        //для selecttype: 'multiple' допускается получение не более 99 постов за раз
        LiveJournal.xmlrpc.getevents({
            journal: journalName,
            auth_method: 'noauth',
            selecttype: 'multiple',
            itemids: getIdsString(fromId, toId)
        }, function (err, value) {
            console.log(fromId, toId, err);
            setTimeout(()=>resolve(value.events), 1000);
        });
    });
}

function getLatestId(journalName) {
    return new Promise((resolve, reject) => {
        LiveJournal.xmlrpc.getevents({
            journal: journalName,
            auth_method: 'noauth',
            selecttype: 'lastn',
            howmany: 1
        }, function (err, value) {
            resolve(parseInt(value.events[0].itemid));
        });
    });
}

function getAllUserPosts(journalName) {
    var promises = [];
    getLatestId(journalName).then((maxId) => {
        for (var i = 0; i <= maxId / 100; i++) {
            // for (var i = 0; i <= 3; i++) {
            promises.push(getPosts(journalName, i * 100 + 1, Math.min(i * 100 + 99, maxId)));
        }
        Promise.all(promises).then((promiseResults)=> {
            var posts = [];
            promiseResults.forEach((events) => {
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
            });
            jsonfile.writeFile(`./../result/${journalName}.json`, {posts: posts}, (err) => {
                if (err != null)
                    console.error(err)
            });
        });
    });
}

// getPosts('tema', 1, 15).then(console.log);
getAllUserPosts('tema');
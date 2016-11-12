const LiveJournal = require('livejournal');
const jsonfile = require('jsonfile');
const args = require('yargs').argv;
var posts = [];

function getLatestId(journalName) {
    return new Promise((resolve, reject) => {
        LiveJournal.xmlrpc.getevents({
            journal: journalName,
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

function getPosts(journalName, fromId, toId) {
    return new Promise((resolve, reject) => {
        //для selecttype: 'multiple' допускается получение не более 99 постов за раз
        LiveJournal.xmlrpc.getevents({
            journal: journalName,
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

function getAllUserPosts(journalName) {
    getLatestId(journalName, console.err).then((maxId) => {
        if (maxId < 100) {
            promises.push(getPosts(journalName, 1, maxId)
                .then(parsePosts, console.err))
                .then(()=>writeToFile(journalName));
        } else {
            let i = 0;
            let intervalId = setInterval(()=> {
                if (i <= maxId / 100) {
                    let fromId = i * 100 + 1;
                    let toId = Math.min(i * 100 + 99, maxId);
                    getPosts(journalName, fromId, toId)
                        .then(parsePosts, console.err)
                        .then(() => {
                            if (toId == maxId) {
                                writeToFile(journalName);
                            }
                        });
                    i++;
                } else {
                    clearInterval(intervalId);
                }
            }, 1000);
        }
    });
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

function writeToFile(journalName) {
    console.log(`Скачано ${posts.length} постов`);
    jsonfile.writeFile(`./../result/${journalName}.json`, {posts: posts}, (err) => {
        if (err != null)
            console.error(err)
    });
}

getAllUserPosts(args.journalName);
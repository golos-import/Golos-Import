const args = require('yargs').argv;

require('./lj').getAllUserPosts(args.journalName);
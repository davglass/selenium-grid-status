#!/usr/bin/env node

var grid = require('../lib');

grid.available({
    host: '10.0.1.25',
}, function(err, available) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
    console.log(JSON.stringify(available, null, 4));
    console.log('There are', available.length, 'browsers attached and ready');
});

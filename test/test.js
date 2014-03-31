#!/usr/bin/env node

var grid = require('../lib');

grid.available({
    host: '10.0.1.25',
}, function(err, status) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
    console.log(JSON.stringify(status, null, 4));
    console.log('There are', status.configs.length, 'node server available with', status.browser.length, 'browsers attached and ready');
});
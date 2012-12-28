Selenium Grid Status
====================


A Selenium grid has no public API to get a list of browers attached and available to test with.

This module parses `/grid/console` and returns a JSON array of the browers that are available.

Install
-------

    npm install selenium-grid-status

Usage
-----

```javascript
var grid = require('selenium-grid-status');

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
```

This should print something like this:

    [
        {
            "platform": "XP",
            "browserName": "firefox",
            "maxInstances": "1",
            "host": "http://10.0.1.133:5555"
        },
        {
            "platform": "XP",
            "browserName": "internet explorer",
            "maxInstances": "1",
            "host": "http://10.0.1.133:5555"
        },
        {
            "platform": "XP",
            "browserName": "firefox",
            "maxInstances": "1",
            "host": "http://10.0.1.126:5555"
        },
        {
            "platform": "XP",
            "browserName": "internet explorer",
            "maxInstances": "1",
            "host": "http://10.0.1.126:5555"
        },
        {
            "platform": "XP",
            "browserName": "firefox",
            "maxInstances": "1",
            "host": "http://10.0.1.116:5555"
        },
        {
            "platform": "XP",
            "browserName": "internet explorer",
            "maxInstances": "1",
            "host": "http://10.0.1.116:5555"
        },
        {
            "platform": "WINDOWS",
            "browserName": "firefox",
            "maxInstances": "1",
            "host": "http://10.0.1.128:5555"
        },
        {
            "platform": "WINDOWS",
            "browserName": "chrome",
            "maxInstances": "1",
            "host": "http://10.0.1.128:5555"
        },
        {
            "platform": "WINDOWS",
            "browserName": "internet explorer",
            "maxInstances": "1",
            "host": "http://10.0.1.128:5555"
        },
        {
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "1",
            "host": "http://10.0.1.50:5555"
        },
        {
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "1",
            "host": "http://10.0.1.50:5555"
        },
        {
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "1",
            "host": "http://10.0.1.173:5555"
        },
        {
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "1",
            "host": "http://10.0.1.173:5555"
        }
    ]
    There are 13 browsers attached and ready

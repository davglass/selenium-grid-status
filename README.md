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
}, function(err, status) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
    console.log(JSON.stringify(status, null, 4));
    console.log('There are', status.configs.length, 'node server available with', status.browser.length, 'browsers attached and ready');
});

```

This should print something like this:

```
{
    "browser": [
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*iexplore",
            "maxInstances": "1"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*googlechrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*googlechrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*googlechrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*googlechrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "Selenium",
            "platform": "MAC",
            "browserName": "*googlechrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "chrome",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "firefox",
            "maxInstances": "5"
        },
        {
            "seleniumProtocol": "WebDriver",
            "platform": "MAC",
            "browserName": "internet explorer",
            "maxInstances": "1"
        }
    ],
    "configs": [
        [
            {
                "attr": "port",
                "data": "4445"
            },
            {
                "attr": "servlets",
                "data": "[]"
            },
            {
                "attr": "host",
                "data": "192.168.1.33"
            },
            {
                "attr": "cleanUpCycle",
                "data": "5000"
            },
            {
                "attr": "browserTimeout",
                "data": "0"
            },
            {
                "attr": "hubHost",
                "data": "localhost"
            },
            {
                "attr": "registerCycle",
                "data": "5000"
            },
            {
                "attr": "capabilityMatcher",
                "data": "org.openqa.grid.internal.utils.DefaultCapabilityMatcher"
            },
            {
                "attr": "newSessionWaitTimeout",
                "data": "-1"
            },
            {
                "attr": "url",
                "data": "http"
            },
            {
                "attr": "remoteHost",
                "data": "http"
            },
            {
                "attr": "prioritizer",
                "data": "null"
            },
            {
                "attr": "register",
                "data": "true"
            },
            {
                "attr": "throwOnCapabilityNotPresent",
                "data": "true"
            },
            {
                "attr": "nodePolling",
                "data": "5000"
            },
            {
                "attr": "proxy",
                "data": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy"
            },
            {
                "attr": "maxSession",
                "data": "5"
            },
            {
                "attr": "role",
                "data": "node"
            },
            {
                "attr": "jettyMaxThreads",
                "data": "-1"
            },
            {
                "attr": "hubPort",
                "data": "4444"
            },
            {
                "attr": "timeout",
                "data": "300000"
            }
        ]
    ]
}
There are 1 node server available with 22 browsers attached and ready
```
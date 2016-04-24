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
    port: 1337,
}, function(err, status) {
    if (err) {
        console.log('Error', err);
        process.exit(1);
    }
    console.log(JSON.stringify(status, null, 4));
    console.log('There are', status.configs.length, 'node server available with', status.browsers.length, 'browsers attached and ready');
});

```

This should print something like this:

```
{
    [
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
            {
                "port": "4445",
                "servlets": "[]",
                "host": "192.168.1.33",
                "cleanUpCycle": "5000",
                "browserTimeout": "0",
                "hubHost": "localhost",
                "registerCycle": "5000",
                "capabilityMatcher": "org.openqa.grid.internal.utils.DefaultCapabilityMatcher",
                "newSessionWaitTimeout": "-1",
                "url": "http",
                "remoteHost": "http",
                "prioritizer": "null",
                "register": "true",
                "throwOnCapabilityNotPresent": "true",
                "nodePolling": "5000",
                "proxy": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
                "maxSession": "5",
                "role": "node",
                "jettyMaxThreads": "-1",
                "hubPort": "4444",
                "timeout": "300000"
            }
        ],
    ],[
        "browsers": [
            ...
        ]
    ]
}
There are 1 node server available with 22 browsers attached and ready
```

If you want to wait for selenium grid to become available and have at least one browser ready, you can use [node-when-cnct-ready](https://github.com/m59peacemaker/node-when-cnct-ready) in conjunction with `selenium-grid-status`:

```js
const hostReady = require('when-cnct-ready');
const gridStatus = require('selenium-grid-status');

const seleniumNode = () =>
  new Promise(resolve => {
    const poll = () =>
      gridStatus.available({ host: 'localhost', port: 4444 }, (err, status) => {
        err || status.length === 0 ? setTimeout(poll, 500) : resolve();
      });

    poll();
  });

const seleniumHub = () =>
  new Promise((resolve, reject) => {
    hostReady({ host: 'localhost', port: 4444 }, function (err) {
      err ? reject(err) : resolve();
    });
  });

seleniumHub()
  .then(() => seleniumNode())
  .then(() => console.log('Selenium grid ready'))
  .catch(console.error);
```

License
-------

BSD

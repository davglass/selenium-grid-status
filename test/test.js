
var vows = require('vows'),
    assert = require('assert'),
    fs = require('fs'),
    path = require('path'),
    mockery = require('mockery');

var html = fs.readFileSync(path.join(__dirname, 'html/index.html'), 'utf8');

mockery.registerMock('http', {
    get: function(options, callback) {
        callback({
            statusCode: 200,
            on: function(name, callback) {
                callback(html);
            }
        });
    }
});

mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
});

var grid = require('../lib');

var tests = {
    'should export': {
        topic: function() {
            return grid;
        },
        'one function': function(d) {
            assert.isFunction(d.available);
        }
    },
    'make request': {
        topic: function() {
            grid.available({}, this.callback);
        },
        'and return data': function (nodes){
            var node1browser = nodes[0].browser,
                node1configs = nodes[0].configs,
                node2browser = nodes[1].browser,
                node2configs = nodes[1].configs;

            assert.ok(nodes);
            assert.isArray(nodes);

            assert.ok(node1browser);
            assert.isArray(node1browser);
            assert.equal(node1browser.length, 22);
            assert.ok(node1configs);
            assert.isArray(node1configs);
            assert.equal(node1configs.length, 1);

            var conf = node1configs[0],
                b = node1browser[0];
            assert.equal(conf.port, '5555');
            assert.equal(conf.host, '10.0.2.194');
            assert.equal(b.seleniumProtocol, 'Selenium');
            assert.equal(b.platform, 'MAC');
            assert.equal(b.browserName, '*iexplore');
            assert.equal(b.maxInstances, '1');

            assert.ok(node2browser);
            assert.isArray(node2browser);
            assert.equal(node2browser.length, 1);
            assert.ok(node2configs);
            assert.isArray(node2configs);
            assert.equal(node2configs.length, 1);

            var conf = node2configs[0],
                b = node2browser[0];
            assert.equal(conf.port, '5556');
            assert.equal(b.seleniumProtocol, 'WebDriver');
            assert.equal(b.browserName, 'phantomjs');
            assert.equal(b.maxInstances, '1');
        }
    }
};

vows.describe('index').addBatch(tests).export(module);

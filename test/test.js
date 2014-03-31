
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
        'and return data': function (d){
            assert.ok(d);
            assert.ok(d.browsers);
            assert.isArray(d.browsers);
            assert.equal(d.browsers.length, 22);
            assert.ok(d.configs);
            assert.isArray(d.configs);
            assert.equal(d.configs.length, 1);
            var conf = d.configs[0],
                b = d.browsers[0];
            assert.equal(conf.port, '5555');
            assert.equal(conf.host, '10.0.2.194');
            assert.equal(b.seleniumProtocol, 'Selenium');
            assert.equal(b.platform, 'MAC');
            assert.equal(b.browserName, '*iexplore');
            assert.equal(b.maxInstances, '1');
        }
    }
};

vows.describe('index').addBatch(tests).export(module);

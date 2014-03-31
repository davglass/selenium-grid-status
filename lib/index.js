var http = require('http'),
    htmlparser = require('htmlparser');


var regContent = /\{\s*([^\s].*[^\s])\s*\}/;
var regSplit = /\s*,\s*/;
var regPart = /^(.*)\s*=\s*(.*)$/;

function find(match, dom) {
    var children = [], c;
    if (Array.isArray(dom)) {
        dom.forEach(function(item) {
            var c = find(match, item);
            if (c.length) {
                c.forEach(function(i) {
                    children.push(i);
                });
            }
        });
    } else {
        if (dom.type === "tag" && match(dom)) {
            children.push(dom);
        }

        if (dom.children) {
            c = find(match, dom.children);
            if (c.length) {
                c.forEach(function(i) {
                    children.push(i);
                });
            }
        }
    }

    return children;
}

function matchBrowserList(node) {
    return node.name === 'div' && node.attribs && node.attribs.type === 'browsers';
}

function matchBrowserItem(node) {
    return node.name === 'img' || node.name === 'a';
}

function matchNodeConfig(node) {
    return node.name === 'div' && node.attribs && node.attribs.type === 'config';
}

function matchProxyList(node) {
    return node.name === 'div' && node.attribs && node.attribs.class === 'proxy';
}

function parseItem(title) {
    /*istanbul ignore next*/
    if (!regContent.test(title)) {
        // this is not an available node
        return false;
    }
    var raw = regContent.exec(title)[1],
        parts = raw.split(regSplit),
        result = {};

    parts.forEach(function (part) {
        var parsed = regPart.exec(part),
            key = parsed[1],
            value = parsed[2];

        result[key] = value;
    });

    return result;
}

function parseItems(items) {
    var browsers = [];
    items.forEach(function (item) {
        var result = parseItem(item.attribs.title);
        /*istanbul ignore else*/
        if (result) {
            browsers.push(result);
        }
    });
    return browsers;
}

function parseConfig(items) {
    var nodeConfigs = [];

    items.forEach(function(item) {

        var nodeConfig = {};
        item.children.forEach(function(config) {
            var data = config.children[0].data.split(/:/);
            nodeConfig[data[0]] = data[1];
        });

        nodeConfigs.push(nodeConfig);
    });

    return nodeConfigs;
}

function parseNodes(items) {
    var nodes = [];

    items.forEach(function(item) {
        var container = find(matchBrowserList, item),
            browsers = find(matchBrowserItem, container),
            configs = find(matchNodeConfig, item);
            nodeConfigs = parseConfig(configs);
            browserConfig = parseItems(browsers);

        nodes.push({
            browser: browserConfig,
            configs: nodeConfigs
        });
    });

    return nodes;
}

exports.available = function(options, callback) {
    http.get({
        host: options.host,
        path: '/grid/console',
        port: options.port || 4444
    }, function(res) {
        var data = '';
        /*istanbul ignore next*/
        if (res.statusCode !== 200) {
            return callback('server returned status code ' + res.statusCode);
        }

        res.on('data', function(c) {
            data += c;
        });

        res.on('end', function() {
            var parser,
                handler = new htmlparser.DefaultHandler(function (error, dom) {
                    var proxies = find(matchProxyList, dom),
                        nodes = parseNodes(proxies);

                    callback(null, nodes);
                }, { verbose: false, ignoreWhitespace: true });

            parser = new htmlparser.Parser(handler);
            parser.parseComplete(data);
        });
    }).on('error', callback);
};

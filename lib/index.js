var http = require('http'),
    htmlparser = require('htmlparser');

var find = function(tag, dom) {
    var children = [], c;
    if (Array.isArray(dom)) {
        dom.forEach(function(item) {
            var c = find(tag, item);
            if (c.length) {
                c.forEach(function(i) {
                    children.push(i);
                });
            }
        });
    } else {
        if (dom.type === "tag" && dom.name === tag) {
            children.push(dom);
        }
        
        if (dom.children) {
            c = find(tag, dom.children);
            if (c.length) {
                c.forEach(function(i) {
                    children.push(i);
                });
            }
        }
    }

    return children;
};

var filter = function(items) {
    var json = [];
    items.forEach(function(item) {
        var sub = item.children,
            o = {
                host: '',
                browsers: []
            };

        sub.forEach(function(s) {
            var url, details, title, data;
            if (s.data && s.data.indexOf('listening on') === 0) {
                url = s.data.replace('listening on ', '');
                o.host = url;
            }

            if (s.name && (s.name === 'img' || s.name === 'a'))  {
                if (!('class' in s.attribs)) {
                    title = s.attribs.title.replace('type=WebDriver', '').replace('{', '').replace('}', '').trim();
                    data = title.trim().split(',');
                    details = {};
                    data.forEach(function(line) {
                        var i = line.trim().split('=');
                        details[i[0]] = i[1];
                    });
                    delete details.seleniumProtocol;
                    o.browsers.push(details);
                }
            }
        });

        json.push(o);
    });

    return json;
};

var flatten = function(items) {
    var out = [];
    items.forEach(function(item) {
        item.browsers.forEach(function(o) {
            o.host = item.host;
            if (o.host.indexOf('cannot be reached at the moment') === -1) {
                out.push(o);
            }
        });
    });
    return out;
};

exports.available = function(options, callback) {
    http.get({
        host: options.host,
        path: '/grid/console',
        port: options.port || 4444
    }, function(res) {
        var data = '';

        if (res.statusCode !== 200) {
            return callback('server returned status code ' + res.statusCode);
        }

        res.on('data', function(c) {
            data += c;
        });

        res.on('end', function() {
            var parser,
                handler = new htmlparser.DefaultHandler(function (error, dom) {
                    var children = find('fieldset', dom), flattened;

                    children = filter(children);
                    flattened = flatten(children);

                    callback(null, flattened);
                }, { verbose: false, ignoreWhitespace: true });

            parser = new htmlparser.Parser(handler);
            parser.parseComplete(data);
        });
    }).on('error', callback);
};

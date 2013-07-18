var http   = require('https'),
    urllib = require('url');

var REQUEST_TIMEOUT = 10 * 1000,
    HARD_TIMEOUT    = REQUEST_TIMEOUT + (5 * 1000);

exports.httpRequest = function(url, body, callback) {
    var options  = urllib.parse(url);
    options.method = 'POST';
    options.headers = {
       'Content-Type': 'application/json',
       'Content-Length': body.length,
    }

    var req = http.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            if (res.statusCode === 200) {
                finishResponse(res.statusCode, data);
            }
            else {
                console.log('http_error=' + res.statusCode);
                finishResponse(res.statusCode, data);
            }
        });
    });

    req.on('error', function(e) {
        console.log('network_error');
        finishResponse();
    });

    req.setTimeout(REQUEST_TIMEOUT, function() {
        console.log('request_timeout');
        finishResponse();
        req.abort();
    });

    var connectionTimeout = setTimeout(function() {
        console.log('connection_timeout');
        finishResponse();
        req.abort();
    }, HARD_TIMEOUT);

    req.write(body, 'utf8');
    req.end();

    function finishResponse(status, data) {
        clearTimeout(connectionTimeout);
        if (callback) {
            console.log('STATUS: ' + status);
            console.log('DATA: ' + data);
            callback(status, data);
            callback = null;
        }
    }
}

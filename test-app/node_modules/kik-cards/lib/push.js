var utils = require('../lib/utils');

exports.send = function(token, ticker, payload, callback) {
    if (!token || typeof token !== 'string') {
        throw "No token provided";
    }
    else if (!ticker || typeof ticker !== 'string') {
        throw "No ticker text provided";
    }
    else if (typeof(callback) != 'function') {
        throw "No callback provided";
    }
    else {
        var url       = 'https://api.kik.com/push/v1/send',
            push_body = { "token" : token, "ticker" : ticker, "data" : payload };
        pushRequest(url, JSON.stringify(push_body), callback);
    }
}

function pushRequest(url, body, callback, retry) {
    retry = retry || 0;
    utils.httpRequest(url, body, function(status, data) {
        if (status == 200) {
            callback();
        }
        else if (status == 403) {
            callback(data, true);
        }
        else if (status == 500 || status == 429 || !status) {
            // exponential back off on retries
            if(retry < 4) {
                retry++;
                var retrySecs = Math.pow(2, retry)
                setTimeout(function() {
                    pushRequest(url, body, callback, retry);
                }, retrySecs * 1000);
                console.log('push request failed. waiting '+ retrySecs +' seconds before retrying.');
            }
            else {
                if (status == 429) {
                    callback('Too many requests.')
                }
                else if (status == 500) {
                   callback(data);
                }
                else {
                    callback('Something went terribly wrong');
                }
                console.log('push request failed. given up trying.');
            }
        }
        else {
            callback('Something went terribly wrong');
        }
    });
}

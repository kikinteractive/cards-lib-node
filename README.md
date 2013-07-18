Kik-Cards - NodeJS Library
==========================

For any kik web app, some features will require having a backend. This NodeJS package makes sending push notifications and verifying user data easy.

Links
-----
* [Push Notifications Docs](http://cards.kik.com/docs/push/)
* [Authentication Docs](http://cards.kik.com/docs/graph/#auth)

Usage
-----

### Getting started

Include the kik-cards module in your package.json, do an 'npm-install' and then require 'kik-cards' on your backend script.

```js
var cards = require('kik-cards');
```

### Sending push notifications

cards.push.send() accepts 3 arguments and a callback function.
This method handles all responses outlined in the 'Push Notifications Docs' and will automatically retry requests where applicable.

```js
// this is the users, unique push token. http://cards.kik.com/docs/push/#token
var push_token = 'pushTokenFromClient';

// this shows up in the status bar
var ticker = 'My awesome ticker text';

// this can be an empty object
var payload = {
    'key' : 'value'
}

cards.push.send(push_token, ticker, payload, function(err, shouldDeleteToken) {
    if(shouldDeleteToken) {
        // the push token has been rejected. You should delete any references to it and not attempt to resend.
    }
    else if(err) {
        // something went wrong :-( 'err' will tell you why!
    }
    else {
        // the push token was sent!
    }
});
```

### Authentication

cards.kik.verify accepts 3 arguments and a callback function.
This method handles all responses outlined in the 'Authentication Docs' and will automatically retry requests where applicable.

```js
// the user we want to verify
var username = 'kikteam';

// the hostname of your app
var host = 'http://meme.kik.com';

// the signed data from kik.cards.sign() for more info - http://cards.kik.com/build/#server-auth
var signedData = 'mySignedData';

cards.kik.verify(username, host, signedData, function(err, unsignedData) {
    if(err) {
        // not verified
    }
    else {
        // do something with unsignedData
    }
});
```


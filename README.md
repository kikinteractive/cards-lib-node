Kik Cards - NodeJS Library
==========================

For any kik web app, some features will require having a backend. This NodeJS package makes sending push notifications and verifying user data easy.

Links
-----
* [Push Notifications Docs](http://cards.kik.com/docs/push/)
* [Authentication Docs](http://cards.kik.com/docs/graph/#auth)

Usage
-----

### Getting started

```sh
npm install kik-cards
```

Alternatively, you can include the library in your `package.json`.

Now you can use the library in your code:

```js
var cards = require('kik-cards');
```

### Sending push notifications

cards.push.send() accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Push Notifications Docs](http://cards.kik.com/docs/push/) and will automatically retry requests where applicable.

```js
// this is the users, unique push token. http://cards.kik.com/docs/push/#token
var pushToken = 'pushTokenFromClient';

// this shows up in the status bar
var ticker = 'My awesome ticker text';

// this can be an empty object
var payload = {
    'key' : 'value'
}

cards.push.send(pushToken, ticker, payload, function (err, shouldDeleteToken) {
    if(shouldDeleteToken) {
        // the push token has been rejected. You should delete any references to it and not attempt to resend.
    }

    if(err) {
        // something went wrong :-( 'err' will tell you why!
    } else {
        // the push token was sent!
    }
});
```

### Authentication

cards.kik.verify accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Authentication Docs](http://cards.kik.com/docs/graph/#server-auth) and will automatically retry requests where applicable.

```js
// the user we want to verify
var username = 'kikteam';

// the hostname of your app
var host = 'http://meme.kik.com';

// the signed data
var signedData = 'mySignedData';

cards.kik.verify(username, host, signedData, function (err, unsignedData) {
    if(err) {
        // not verified
    }
    else {
        // do something with unsignedData
    }
});
```

### Anonymous authentication

cards.kik.anonymousVerify accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Anonymous Authentication Docs](http://cards.kik.com/docs/graph/#auth) and will automatically retry requests where applicable.

```js
// the anonymous user we want to verify
var anonToken = 'getThisFromTheClient';

// the hostname of your app
var host = 'http://meme.kik.com';

// the signed data
var signedData = 'mySignedData';

cards.kik.anonymousVerify(anonToken, host, signedData, function (err, unsignedData) {
    if (err) {
        // not verified
    } else {
        // do something with unsignedData
    }
});
```

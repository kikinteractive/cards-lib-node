Kik API - NodeJS Library
==========================

For any webapp, some features will require having a backend. This NodeJS package makes verifying user data easy for those developing against the Kik browser API.

Links
-----
* [Authentication Docs](http://dev.kik.com/docs/#identity-auth)

Usage
-----

### Getting started

```sh
npm install kik-lib
```

Alternatively, you can include the library in your `package.json`:
```json
{
  "dependencies" : {
    "kik-lib" : "1.0.0"
  }
}
```

Now you can use the library in your code:

```js
var kik = require('kik-lib');
```



### Authentication

`kik.verify()` accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Authentication Docs](http://dev.kik.com/docs/#identity-auth) and will automatically retry requests where applicable.

```js
// the user we want to verify
var username = 'kikteam';

// the hostname of your app
var host = 'myapp.com';

// the signed data from the client. http://dev.kik.com/docs/#identity-auth
var signedData = 'mySignedData';

kik.verify(username, host, signedData, function (err, unsignedData) {
  if (err) {
    // not verified
  } else {
    // do something with unsignedData
  }
});
```

### Anonymous authentication

`kik.anonymousVerify()` accepts 3 arguments and a callback function.
This method handles all responses outlined in the [Anonymous Authentication Docs](http://dev.kik.com/docs/#identity-anon) and will automatically retry requests where applicable.

```js
// the anonymous user we want to verify
var anonToken = 'getThisFromTheClient';

// the hostname of your app
var host = 'myapp.com';

// the signed data
var signedData = 'mySignedData';

kik.anonymousVerify(anonToken, host, signedData, function (err, unsignedData) {
  if (err) {
    // not verified
  } else {
    // do something with unsignedData
  }
});
```

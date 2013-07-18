(function (cards, App) {

    var USER_KEY = '__USER_DATA__',
        PUSH_KEY = '__PUSH_DATA__';

    App.populator('notloggedin', function (page) {

        // login click handler
        $(page)
            .find('#signin')
            .on('click', function (e) {
                if(cards.kik && cards.kik.getUser) {
                    cards.kik.getUser(function (user) {

                        // sign the message
                        cards.kik.sign(JSON.stringify(user), function(signedData, username, host) {
                            if(!signedData) {
                                // failed to sign
                                // perhaps user denied permissions
                                // or not using HTTPS
                                App.dialog({
                                    title : 'Oh Snap!',
                                    text : "Something went terribly wrong",
                                });
                            }
                            else {
                                // successfully signed
                                API.verifyUser(username, host, signedData, function(err) {
                                    if(err) {
                                        App.dialog({
                                            title : 'Oh Snap!',
                                            text : err,
                                        });
                                    }
                                    else {
                                        localStorage[USER_KEY] = JSON.stringify(user);
                                        getPushToken();
                                        App.load('loggedin');
                                        App.removeFromStack();
                                    }
                                });
                            }
                        });
                    });
                }
            });
    });

    App.populator('loggedin', function (page) {

        // update the title bar with the username
        if(localStorage[USER_KEY]) {
            var user = JSON.parse(localStorage[USER_KEY]);
            $(page).find('.username').html(user.firstName);
        }

        // signout click handler
        $(page)
            .find('#signout')
            .on('click', function (e) {
                alert('button was clicked!');
            });

        // send push handler
        $(page)
            .find('#send-push')
            .on('click', function(e) {

                // send the contents of the .app-input
                var message = $(page).find('.app-input').val();

                if(message) {

                    // let the user know we're doing something
                    var btn = $(page).find('#send-push');
                    btn.html('Sending...');

                    // send the push notification
                    API.sendPush(
                        localStorage[PUSH_KEY],
                        message,
                        {
                            'title': 'You got pushed',
                            'body': '"' + message + '"',
                        },
                        function(err, shouldDeleteToken) {
                            if(err) {
                                App.dialog({
                                    title : 'Oh Snap!',
                                    text : err,
                                });
                            }
                            btn.html('Send push notification');
                        }
                    );
                }
            });
    });

    // handle incoming push notifications
    if(cards.push) {
        cards.push.handler(function(data) {
            App.dialog({
                title : data.title,
                text : data.body,
            });
        });
    }

    // force the user to login
    if(cards.kik && cards.kik.hasPermission()) {
        App.load('loggedin');
    }
    else {
        App.load('notloggedin');
    }

    // helper function to get push token and keep a local copy
    function getPushToken() {
        localStorage[PUSH_KEY] = "";
        cards.push.getToken(function(token) {
            localStorage[PUSH_KEY] = token;
        });
    }

})(cards, App);

module.exports = {

    'facebookAuth' : {
        'clientID'      : '108746482906103', // your App ID
        'clientSecret'  : '269c0b2aa5f98d26de50f590e0a75032', // your App Secret
        'callbackURL'   : 'http://localhost:8000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '52879477469-sj68ii98mehqdpas0s0tvov02hlpegbd.apps.googleusercontent.com',
        'clientSecret'  : 'hVLFTEGatlXYbT5J1CZSnojM',
        'callbackURL'   : 'http://localhost:8000/auth/google/callback'
    }

};
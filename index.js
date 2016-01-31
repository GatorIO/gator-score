/*!
 * gator-profile
 * MIT Licensed
 */

/*
 Get a user profile.
 Returns:
 1) An error object if one occurs
 2) The profile object
 */

module.exports = function(params, callback) {

    try {

        var query = '?ip=' + params.ip, path = '/v1/score';

        //  get an access token for full access at www.gator.io
        if (params.accessToken)
            query += 'accessToken=' + params.accessToken;

        if (params.ua)
            query += '&ua=' + encodeURIComponent(params.ua);

        //  referrer is used to get search engine, keywords and some quality info
        if (params.referrer)
            query += '&referrer=' + encodeURIComponent(params.referrer);

        //  the url is used to get campaign, source, medium and other query string info
        if (params.url)
            query += '&url=' + encodeURIComponent(params.url);

        const https = require('https');

        var options = {
            hostname: 'api.gator.io',
            port: 443,
            path: path + query,
            method: 'GET'
        };

        var req = https.request(options, function(res) {

            var result = '';

            res.setTimeout(100);

            res.on('data', function(chunk) {
                result += chunk;
            });

            res.on('end', function() {
                callback(null, JSON.parse(result));
            });
        });
        req.end();

        req.on('error', function(err) {
            callback(err);
        });
    } catch(err) {
        callback(err);
    }
};


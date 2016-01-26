/*!
 * gator-profile
 * MIT Licensed
 */

module.exports = getProfile;

function getProfile(params, callback) {

    var query = '?ip=' + params.ip, path = '/analytics/profile';

    //  get an access token for full access at www.gator.io
    if (params.accessToken) {
        query += 'accessToken=' + params.accessToken;
    } else {

        //  if no access token, use the free version
        path += '/free';
    }

    if (params.ua)
        query += 'ua=' + encodeURIComponent(params.ua);

    //  referrer is used to get search engine, keywords and some quality info
    if (params.referrer)
        query += 'referrer=' + encodeURIComponent(params.referrer);

    const https = require('https');

    var options = {
        hostname: 'api.gator.io',
        port: 443,
        path: path + query,
        method: 'GET'
    };

    var req = https.request(options, function(res) {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);

        res.on('data', function(d) {
            process.stdout.write(d);
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
}


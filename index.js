/*!
 * gator-score
 * MIT Licensed
 */

/*
 Get a user profile.
 Returns:
 1) An error object if one occurs
 2) The profile object
 */

module.exports = {

    score: function(params, callback) {

        try {

            var aborted, timeout = 1000, protocol, query = '?ip=' + params.ip, path = '/v1/score';

            //  get an access token for full access at www.gator.io
            if (params.accessToken)
                query += '&accessToken=' + params.accessToken;
            else
                timeout = 2000;     //  free version delays result, so make timeout longer

            if (params.ua)
                query += '&ua=' + encodeURIComponent(params.ua);

            //  referrer is used to get search engine, keywords and some quality info
            if (params.referrer)
                query += '&referrer=' + encodeURIComponent(params.referrer);

            //  the url is used to get campaign, source, medium and other query string info
            if (params.url)
                query += '&url=' + encodeURIComponent(params.url);

            //  default options
            var options = {
                hostname: 'api.gator.io',   //  this can be changed to an endpoint geographically close to caller
                port: 443,
                path: path + query,
                method: 'GET'
            };

            if (params.timeout)
                timeout = params.timeout;

            //  allow overriding of api protocol, location and port for intranet or colocation usage
            if (params.apiProtocol) {

                if (params.apiProtocol != 'http' && params.apiProtocol != 'https') {
                    callback({ code: 400, message: 'protocol not supported' });
                    return;
                }
                protocol = require(params.apiProtocol);
            } else {
                //  default to https
                protocol = require('https');
            }

            if (params.apiHost) {
                options.hostname = params.apiHost;
            }

            if (params.apiPort) {
                options.port = params.apiPort;
            }

            var req = protocol.request(options, function(res) {

                var result = '';

                res.on('data', function(chunk) {
                    result += chunk;
                });

                res.on('end', function() {

                    if (!aborted) {

                        try {
                            result = JSON.parse(result);

                            if (result.code == 200)
                                callback(null, result.data);
                            else
                                callback(result);
                        } catch(err) {
                            callback({ code: 500, message: err.message });
                        }
                    }
                });
            });

            req.setTimeout(timeout, function() {
                aborted = true;
                req.abort();
                callback({ code: 408, message: 'Request Timeout' });
            });
            req.end();

            req.on('error', function(err) {
                if (!aborted)
                    callback({ code: 500, message: err.message });
            });
        } catch(err) {
            callback({ code: 500, message: err.message });
        }
    }
}

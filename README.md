![gator-score](https://gator.io/images/logo-light-background.png "gator-score")

[gator-score](https://gator.io) is a realtime API to get a user's fraud score, geolocation, device, demographic, search and technology data based on an IP address, user
agent and referrer.

# Usage

## Server side scoring
```javascript

var gator = require('gator-score');

//  Example - within an express route
app.get('/test', function (req, res) {

    var options = {
        accessToken: '',                    
        ip: req.ip,
        ua: req.headers['user-agent'],
        referrer: req.headers['referer'],
        url: req.host
    };

    gator.score(options, function(err, result) {

        if (!err && result && result.score < 100)   //  a score less the 100 is very likely a bot
            res.render('botContent');
        else
            res.render('humanContent');
    });
});
```
See full [documentation](https://gator.io/developer/scoring).

# Installation

    $ npm install gator-score

# Options
- `accessToken` The access token for the call that you can get from a gator.io account.  Leave this blank for the free version, which is rate limited.
- `ip` The IP address of the user.
- `ua` The user agent of the user.
- `referrer` The user's referrer.
- `url` The url of your site the user is on
- `timeout` The timeout in milliseconds to wait for a response.  Set this to a low value for a production website. 
 
# Endpoints
We are creating global endpoints for this API.  The API is extremely fast, however we cannot control latency on the internet.  To address this, we support colocation or replication to within your cloud provider's site.  Please [contact us](https://gator.io) to set this up.

## License

The MIT License (MIT)
Copyright (c) 2016 Phil Vizzaccaro

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Bugs

See <https://github.com/gatorio/gator-score/issues>.

![gator-score](https://gator.io/images/logo-light-background.png "gator-score")

[gator-score](https://gator.io) is a realtime API to get a user's fraud score, geolocation, device, demographic, search and technology data based on an IP address, user agent and referrer.  

A fraud score is a number from 0-1000 which indicates the likelyhood that the user is a bot.  A score less than 100 means it is very likely the user is a bot.

We use various methods to determine the fraud score, see our [methodology](https://gator.io/how).

In addition, the API returns all the detectable information on the user, like the device, geolocation, etc.  This data is aggregated and available for reporting for account holders.

The API uses a REST interface, so it can be used from any platform.

## Free version
There is a free version available that is rate-limited.  No access token is required for the free version.

# Usage

## Server side scoring in Node.js
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


## Methods

### score(options, [callback])

Scores the user and returns the result in the callback.

__Arguments__

* `options` An object containing the scoring parameters: 
** `accessToken` The access token for the call that you can get from a gator.io account.  Leave this blank for the free version, which is rate limited.
** `ip` The IP address of the user.
* `ua` The user agent of the user.
* `referrer` The user's referrer.
* `url` The url of your site the user is on
* `timeout` The timeout in milliseconds to wait for a response.  Set this to a low value for a production website.

## Endpoints
We are creating global endpoints for this API.  The API is extremely fast, however we cannot control latency on the internet.  To address this, we support colocation or replication to your cloud provider's site.  Please [contact us](https://gator.io) to set this up.

## Sample Use Cases
- `Ads`	Do not display ads to invalid users. Keep your reputation as a publisher intact.
- `Content Optimization`	Tailor your content based on a user's geo, demo or device type.
- `Offers`	Base offers on search terms, or user's demographic.
- `Publisher Networks`	See which publishers have the best and worst traffic.
- `Save bandwidth`	Why stream videos to bots?

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

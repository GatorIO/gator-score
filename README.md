![gator-score](https://gator.io/images/logo-light-background.png "gator-score")

[gator-score](https://gator.io) is a realtime API to get a user's fraud score, geolocation, device, demographic, search and technology data based on an IP address, user
agent and referrer.

# Usage

## Server side scoring
See full [documentation](https://gator.io/developer/scoring).
```javascript
app.get('/test', function (req, res) {
    gator.score(options, function(err, result) {

        if (err)
            result = err;
        else if (!result)
            result = { code: 500, message: 'No result returned' };

        res.render('scoringTest',{
            settings: utils.config.settings(),
            application: application,
            req: req,
            result: result
        });
    });
});
```

# Installation

    $ npm install gator-score

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

# reopen-tty
[![NPM version](https://badge.fury.io/js/reopen-tty.svg)](http://badge.fury.io/js/reopen-tty)
[![Build Status](https://secure.travis-ci.org/indutny/reopen-tty.svg)](http://travis-ci.org/indutny/reopen-tty)

## Why?

Opening and using `/dev/tty` is trivial only on Unixes. Windows has a
[different way][0] of doing this.

## How?

On Unixes it just opens `/dev/tty` and passes it to `tty.ReadStream` or
`tty.WriteStream` depending on the desired tty kind.

On Windows it opens `conin$`/`conout$` using Node.js internals, and
passes them to `tty.ReadStream`/`tty.WriteStream`.

## Installation

```bash
npm install -g reopen-tty
```

## Usage

```js
const reopenTTY = require('reopen-tty');

reopenTTY.stdin((err, tty) => {
  tty.on('data', (data) => console.log('DATA: ' + data));
});
```

## LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2016.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.

[0]: https://msdn.microsoft.com/en-us/library/ms682075.aspx

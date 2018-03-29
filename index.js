'use strict';

const fs = require('fs');
const tty = require('tty');

let openTTY;
if (process.platform === 'win32') {
  const cfs = process.binding('fs');

  // Synchronous, but who cares?
  openTTY = (kind, callback) => {
    const name = kind === 'stdin' ? 'conin$' : 'conout$';
    try {
      callback(null, cfs.open(name, fs.constants.O_RDWR | fs.constants.O_EXCL, 0o666));
    } catch (e) {
      callback(e);
    }
  };
} else {

  openTTY = (kind, callback) => {
    fs.open('/dev/tty', 'r+', callback);
  };
}

function wrap(name) {
  return function accessor(options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }

    openTTY(name, (err, fd) => {
      if (err)
        return callback(err);

      if (name === 'stdin')
        callback(null, new tty.ReadStream(fd, options));
      else
        callback(null, new tty.WriteStream(fd, options));
    });
  };
}

exports.stdin = wrap('stdin');
exports.stdout = wrap('stdout');
exports.stderr = wrap('stderr');

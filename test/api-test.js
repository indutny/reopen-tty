'use strict';

const test = require('tape');

const reopenTTY = require('../');

test('stdin', (t) => {
  reopenTTY.stdin((err, stdin) => {
    t.error(err);
    stdin.destroy();
    t.end();
  });
});

test('stdout', (t) => {
  reopenTTY.stdout((err, stdout) => {
    t.error(err);
    stdout.write('ohai\n', () => {
      stdout.destroy();
      t.end();
    });
  });
});

test('stderr', (t) => {
  reopenTTY.stderr((err, stderr) => {
    t.error(err);
    stderr.write('ohai\n', () => {
      stderr.destroy();
      t.end();
    });
  });
});

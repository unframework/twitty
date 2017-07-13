const fs = require('fs');
const tty = require('tty');
const React = require('react');
const blessed = require('blessed');
const render = require('react-blessed').render;

const App = require('./App');

const inputStream = new tty.ReadStream(fs.openSync('/dev/ttyUSB0', 'r'));
const outputStream = new tty.WriteStream(fs.openSync('/dev/ttyUSB0', 'w'));

// @todo fix size detection at TTY driver level
outputStream.columns = 80;
outputStream.rows = 24;

// const inputStream = process.stdin;
// const outputStream = process.stdout;

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    terminal: 'vt220',
    input: inputStream,
    output: outputStream,
    title: 'Twitty'
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

render(React.createElement(App), screen);

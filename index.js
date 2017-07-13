const fs = require('fs');
const tty = require('tty');
const React = require('react');
const blessed = require('blessed');
const render = require('react-blessed').render;

// Rendering a simple centered box
// class App extends Component {
//   render() {
//     return (
//       <box top="center"
//            left="center"
//            width="50%"
//            height="50%"
//            border={{type: 'line'}}
//            style={{border: {fg: 'blue'}}}>
//         Hello World!
//       </box>
//     );
//   }
// }

const inputStream = new tty.ReadStream(fs.openSync('/dev/ttyUSB0', 'r'));
const outputStream = new tty.WriteStream(fs.openSync('/dev/ttyUSB0', 'w'));

// @todo fix size detection at TTY driver level
outputStream.columns = 80;
outputStream.rows = 24;

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    terminal: 'vt220',
    input: inputStream,
    output: outputStream,
    title: 'Twitty'
});

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  }
});

// Append our box to the screen.
screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render();

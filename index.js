
const fs = require('fs');
const tty = require('tty');

// const tessel = require('tessel');

// const errLED = tessel.led[0];

// setInterval(function () {
//     if (errLED.isOn) {
//         errLED.off();
//     } else {
//         errLED.on();
//     }
// }, 500);

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

const screen = blessed.screen({
    // autoPadding: true,
    // smartCSR: true,
    input: new tty.ReadStream(fs.openSync('/dev/ttyUSB0', 'r')),
    output: new tty.WriteStream(fs.openSync('/dev/ttyUSB0', 'w')),
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
  },
  // style: {
  //   fg: 'white',
  //   bg: 'magenta',
  //   border: {
  //     fg: '#f0f0f0'
  //   },
  //   hover: {
  //     bg: 'green'
  //   }
  // }
});

// Append our box to the screen.
screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

screen.render();


const fs = require('fs');

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

// const screen = blessed.screen({
//     autoPadding: true,
//     smartCSR: true,
//     terminal: 'vt220',
//     input: fs.createReadStream('/dev/ttyUSB0'),
//     output: fs.createWriteStream('/dev/ttyUSB0'),
//     title: 'Twitty'
// });

// // Create a box perfectly centered horizontally and vertically.
// var box = blessed.box({
//   top: 'center',
//   left: 'center',
//   width: '50%',
//   height: '50%',
//   content: 'Hello {bold}world{/bold}!',
//   tags: true,
//   border: {
//     type: 'line'
//   },
//   // style: {
//   //   fg: 'white',
//   //   bg: 'magenta',
//   //   border: {
//   //     fg: '#f0f0f0'
//   //   },
//   //   hover: {
//   //     bg: 'green'
//   //   }
//   // }
// });

// // Append our box to the screen.
// screen.append(box);

// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//     return process.exit(0);
// });

// screen.render();

const program = blessed.program({
    input: fs.createReadStream('/dev/ttyUSB0'),
    output: fs.createWriteStream('/dev/ttyUSB0'),
});

program.key('q', function(ch, key) {
  program.clear();
  program.disableMouse();
  program.showCursor();
  program.normalBuffer();
  process.exit(0);
});

program.on('mouse', function(data) {
  if (data.action === 'mousemove') {
    program.move(data.x, data.y);
    program.bg('red');
    program.write('x');
    program.bg('!red');
  }
});

program.alternateBuffer();
program.enableMouse();
program.hideCursor();
program.clear();

program.move(1, 1);
program.bg('black');
program.write('Hello world', 'blue fg');
program.setx((program.cols / 2 | 0) - 4);
program.down(5);
program.write('Hi again!');
program.bg('!black');
program.feed();

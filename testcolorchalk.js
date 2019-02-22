const chalk = require('chalk');
 const log = console.log;
 
// Combine styled and normal strings
 log(chalk.blue('Hello') + ' World' + chalk.red('!'));

 
// Combine styled and normal strings
// console.log(chalk.yellow('Hello') + ' World' + chalk.orange('!'));

let worldString = "Hello, world";
console.log('\x1b[36m%s\x1b[34m%s\x1b[0m', 'I am cyan','i am blue');

console.log(chalk.bold(worldString));   // <blink>Hello, world</blink>
console.log(chalk.green(worldString));    // <b>Hello, world</b>
console.log(chalk.yellow(worldString)); // <i>Hello, world</i>
console.log(chalk.cyan(worldString));  // <strike>Hello, world</strike>
console.log(chalk.red("pinky melinky"));  // <strike>Hello, world</strike>
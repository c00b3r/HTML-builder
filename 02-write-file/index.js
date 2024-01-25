const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Enter text.');

rl.on('line', (input) => {
    if (input.toLowerCase() === 'exit') {
        console.log('Goodbye!');
        rl.close();
        writeStream.end();
        process.exit();
    } else {
        writeStream.write(input + '\n');
    }
});

rl.on('SIGINT', () => {
  console.log('Goodbye!');
  rl.close();
  writeStream.end();
  process.exit();
});
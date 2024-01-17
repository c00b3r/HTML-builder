const fs = require('fs');
const readline = require('readline');

const file = './02-write-file/text.txt'
const writeFile = fs.createWriteStream(file);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readLine = function () {
  rl.question('>', function (answer) {
    if (answer.toLowerCase() == 'exit') 
      return rl.close();
    writeFile.write(`${answer}\n`);
    readLine(); 
  });
};
readLine();
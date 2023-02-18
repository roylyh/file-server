const net = require('net');
const readline = require('readline');
const fs = require('fs');
let fileName = "";

const config = {
  host:"localhost",
  port:"3000",
};

const connection = net.createConnection(config);

connection.on('data', (data) => {
  console.log("Writing data chunk to file...");
  const writeStream = fs.createWriteStream(`./${fileName}`);
  writeStream.write(data);
}
);

connection.on("end",()=>{
  console.log("File transfer complete.");
  connection.destroy();
  process.exit();
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What file do you want to download? ",(answer) => {
  connection.write(answer);
  fileName = answer;
  rl.close;
}
);
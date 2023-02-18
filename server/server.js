const fs = require("fs");
const net = require("net");

const server = net.createServer();

const port = 3000;

server.on("connection", (socket) => {
  console.log("Someone has connected to the server!");
  socket.on("data", (filename) => {
    console.log("Request of filename is received...");

    // check if the filename submitted exists in the folder
    if (fs.existsSync(`./${filename}`)) {
      console.log;
      // create a readstream
      const readstream = fs.createReadStream(`./${filename}`);
      readstream
        .on("open", () => {
          console.log("Server is sending data to client...");
          readstream.pipe(socket);
        })
        .on("close", () => {
          console.log("File transfer complete. Ending connection with client.");
        });
    } else {
      console.log("Error, file not found.");
      socket.write("Error, file not found");
    }
  });
});

server.on("error", () => {
  console.log("Error. Closing server.");
  server.close();
});

server.listen(port, () => {
  console.log(`tcp server listening on port ${port}`);
});

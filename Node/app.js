const http = require("http");
const express = require("express");
const glob = require("glob");
const fs = require('fs');

var app = express();

const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

const directoryPaths = process.argv.slice(2);

let interval;

// socket implementation for real time file system
io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  watchDirectories(socket); // watch directory changes

  getAndEmitDirectoryFiles(socket); // get directory files and emit socket event

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

// watch directory
const watchDirectories = socket => {

  directoryPaths.map((directory) => {
    fs.watch(directory, { recursive: true }, (eventType) => { // watch directory by its path
      if (eventType === 'rename' || eventType === 'change') { // match event type
        getAndEmitDirectoryFiles(socket);                     // call function to get and emit directory files
      }
    });
  });

};

// get directory files and emit them
const getAndEmitDirectoryFiles = socket => {

  let directoryFiles = directoryPaths.map(async (directory) => {
    return await getDirectories(directory); //get directory files by its path
  });

  Promise.all(directoryFiles)
    .then(files => {
      socket.emit("getAllDirectories", files);  //resolve promise and emit all directories files event
    })
    .catch(error => {
      console.error(error)
    });

};

// get directory files by its path name
var getDirectories = function (src) {

  return new Promise((resolve, reject) => {

    glob(src + '/**/*', function (err, res) {
      if (err) {
        console.log('Error', err);
        reject(err);
      } else {
        const files = res.map((file) => {
          return { key: file }
        });

        resolve(files);
      }
    });

  });
};

const port = process.env.PORT || 80;
server.listen(port, () => console.log(`Listening on port ${port}`));

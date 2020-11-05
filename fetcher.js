// request
const request = require('request');
// Node's fs module
const fs = require('fs');

const sliced = process.argv.slice(2);
const reqURL = sliced[0];
const downloadPath = sliced[1];

request(reqURL, (error, response, body) => {
  // get file size
  const filesize = getFileSize(downloadPath);
  
  // write file (body from request) to specified path
  fs.writeFile(downloadPath, body, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Downloaded and saved ${filesize} to ${downloadPath}`);
  });
});

// get file size using fs
// from https://stackoverflow.com/questions/42363140/how-to-find-the-size-of-the-file-in-node-js
const getFileSize = function(data) {
  const stats = fs.statSync(data);
  const fileSizeInBytles = stats['size'];
  return fileSizeInBytles;
};
// dependancies we need for our request() and write() functions to work
const request = require('request');
const fs = require('fs');

// declare the url as the 3rd command line arg and the path2SaveFile as 4th command line arg
const pageDownloader = function(cliArgs) {
  const url = cliArgs[0];
  const path2SaveFileAndName = cliArgs[1];
  
  // check if process.argv[2] || process.argv[3] are empty here, throw an error, return & throw an error if so
  if (url === undefined || path2SaveFileAndName === undefined) {
    console.log("You forgot a url and/or path to save your new file at!");
    return; 
  }

  // function to actually make the request
  // print the error if one occurred
  // print the response status code if a response was received
  // print the HTML for the Google homepage.
  request(url, (error, response, body) => {

    // catch any errors that may be returned from the server we requested the page from
    if (error) {
      return error;
    }

    // store and save body into a new file down here
    // https://nodejs.org/en/knowledge/file-system/how-to-write-files-in-nodejs/
    // if twriteFile() returns any kind of error when attempting to write this file (like if it sees an invalid path), it will throw an error
    // pass this error into our inline arrow function as the third argument of writefile() to do some error checking
    fs.writeFile(path2SaveFileAndName, body, (err) => {

      // if writeFile() returns any kind of error, throw the encountered error to the user
      // otherwise, let the user know this new file has beeen saved
      if (err) {
        throw err;
      }
      console.log('The file has been saved sucessfuly!');
    });
  });
};

// feed this function call a : url from users 3rd command line argument, file path to save that file to as 4th arg
// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
pageDownloader(process.argv.slice(2));
const fs = require("fs");

// Sync
// fs.writeFileSync('./test.txt', "Sync Test File Created");

// Async
// fs.writeFile('./test.txt', "Async Test File Created", (err) => {
//     console.log(err);
// });

// const testFileContent = fs.readFileSync('./test.txt', 'utf-8');

// console.log("Test File Content =>", testFileContent);



// fs.readFile('./test.txt', 'utf-8', (err, result) => {
//     (err) ? console.log("Test File Content Async Error =>", err) : console.log("Test File Content Async =>", result);
// });

// Append content to existing File
// fs.appendFileSync('./test.txt', ' and Async Test File Updated')

console.log(`Date: ${Date.now()}`);

// // copy file
// fs.cp('./test.txt', './copy.txt', (err, result) => {
//     (err) ? console.log("err : ", err) : console.log("result: ", result);    
// });

// Delete an existing file

// fs.unlinkSync('./copy.txt');
console.log(fs.statSync('./test.txt'));

// fs.mkdirSync('my-doc/a', {recursive: true});





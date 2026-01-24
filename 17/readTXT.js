const fs = require('fs');

fs.readFile('text.txt', "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file: ", err)
    return
  }
  const lines = data.split(' ')
  console.log(lines.length)
})
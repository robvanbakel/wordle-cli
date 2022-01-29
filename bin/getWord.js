const fs = require('fs')
const path = require('path')

let buffer = fs.readFileSync(path.join(__dirname, 'words.json'))
let words = JSON.parse(buffer)

const getWord = (date = new Date(),random) => {

  if(random) {
    return words[Math.floor(Math.random() * words.length)].toUpperCase().split('')
  }

  // Get word for specified date
  const diff = new Date(date) - new Date(2021, 5, 19)
  const index = Math.floor(diff / 864e5)
  return words[index].toUpperCase().split('')

}

module.exports = getWord

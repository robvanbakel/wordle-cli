const fs = require('fs')
const path = require('path')

// GET WORD

let wordsBuffer = fs.readFileSync(path.join(__dirname, 'words.json'))
let words = JSON.parse(wordsBuffer)

const get = (date = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), random) => {
  
  if (random) {
    return words[Math.floor(Math.random() * words.length)].toUpperCase().split('')
  }

  // Get word for specified date
  const diff = new Date(date) - new Date(Date.UTC(2021, 5, 19))
  const index = Math.floor(diff / 864e5)
  return words[index].toUpperCase().split('')
}

// VALIDATE WORD

let validWordsBuffer = fs.readFileSync(path.join(__dirname, 'validWords.json'))
let validWords = JSON.parse(validWordsBuffer)

const validate = (word) => {
  if (words.includes(word) || validWords.includes(word)) {
    return true
  }
}

// SHOW WORD

const formattingCodes = {
  green: [30, 42],
  yellow: [30, 43],
  none: [1, 37, 40],
  reset: [0],
}

const format = (color = 'reset') => `\x1b[${formattingCodes[color].join(';')}m`
const endTile = () => format() + ' '
const insertSpaces = (num) => new Array(num + 1).join(' ')

const show = (result) => {
  let topBottom = ''
  let middle = ''

  result.forEach(({ color, letter }) => {
    topBottom += format(color) + insertSpaces(7) + endTile()
    middle += format(color) + insertSpaces(3) + letter + insertSpaces(3) + endTile()
  })

  console.log(`\n\n${topBottom}\n${middle}\n${topBottom}\n\n`)
}

module.exports = { show, get, validate }

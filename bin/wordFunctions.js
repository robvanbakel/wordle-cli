const fs = require('fs')
const path = require('path')

const { insertSpaces } = require('./utils')

// GET WORD

const formatWord = (word) => word.toUpperCase().split('')

const wordsBuffer = fs.readFileSync(path.join(__dirname, 'words.json'))
const words = JSON.parse(wordsBuffer)

const get = (options) => {
  // Get user specified word
  if (options.word) {
    return {
      wordOfTheDay: formatWord(options.word),
      gameId: false,
    }
  }

  // Get random word
  if (options.random) {
    const gameId = Math.floor(Math.random() * words.length)

    return {
      wordOfTheDay: formatWord(words[gameId]),
      gameId,
    }
  }

  // Get word for specified date
  const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  const date = options.date || today

  const diff = new Date(date) - new Date(Date.UTC(2021, 5, 19))
  const gameId = Math.floor(diff / 864e5)

  return {
    wordOfTheDay: formatWord(words[gameId]),
    gameId,
  }
}

// VALIDATE WORD

const validWordsBuffer = fs.readFileSync(path.join(__dirname, 'validWords.json'))
const validWords = JSON.parse(validWordsBuffer)

const validate = (word) => words.includes(word) || validWords.includes(word)

// SHOW WORD

const formattingCodes = {
  green: [30, 42],
  yellow: [30, 43],
  none: [1, 37],
  reset: [0],
}

const format = (color = 'reset') => `\x1b[${formattingCodes[color].join(';')}m`
const endTile = () => `${format()} `

const show = async (result) => {
  let topBottom = ''
  let middle = ''
  const breakpoints = []

  result.forEach(({ color, letter }) => {
    topBottom += format(color) + insertSpaces(7) + endTile()
    middle += format(color) + insertSpaces(3) + letter + insertSpaces(3) + endTile()
    breakpoints.push(middle.length)
  })

  console.log('\n\n\n\n\n\n')

  for (let i = 0; i < result.length; i += 1) {
    process.stdout.moveCursor(0, -5)

    process.stdout.write(`${topBottom.substring(0, breakpoints[i])}\n`)
    process.stdout.write(`${middle.substring(0, breakpoints[i])}\n`)
    process.stdout.write(`${topBottom.substring(0, breakpoints[i])}\n`)
    process.stdout.write('\n\n')

    // eslint-disable-next-line
    await new Promise((resolve) => setTimeout(resolve, 300))
  }
}

module.exports = { show, get, validate }

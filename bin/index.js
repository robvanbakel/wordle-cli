#! /usr/bin/env node
const { createInterface } = require('readline')
const word = require('./functions')
const getOptions = require('./getOptions')
const messages = require('./messages')

// Define variables
let currentRound = 0
let gameWon = false
const options = getOptions()
const rounds = options.guesses || 6
const { wordOfTheDay, gameId } = word.get(options)
const guessRegex = new RegExp(`^[a-z]{${wordOfTheDay.length}}$`, 'i')

const wordle = createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Start new round
const round = () => {
  const result = new Array(wordOfTheDay.length).fill({})

  wordle.question('Guess a word: ', (input) => {
    // Check if input is valid
    if (!guessRegex.test(input)) {
      console.log(`\nChoose a ${wordOfTheDay.length}-letter word!\n`)
      round()
      return
    } else if (!options.word && !word.validate(input.toLowerCase())) {
      console.log(`\n${input.toUpperCase()} is not a valid word!\n`)
      round()
      return
    } else if (!options.unlimited) {
      currentRound++
    }

    const userWord = input.toUpperCase().split('')

    // Set correctly guessed letters to green
    userWord.forEach((letter, index) => {
      if (letter === wordOfTheDay[index]) {
        result[index] = {
          ...result[index],
          letter,
          color: 'green',
        }
      }
    })

    // Set wrongly placed letters to yellow
    userWord.forEach((letter, index) => {
      if (!result[index].color && wordOfTheDay.includes(letter) && !options.hard) {
        const matchingResultLetters = result.filter((item) => item.letter === letter)
        const matchingWordOfTheDayLetters = wordOfTheDay.filter((item) => item === letter)

        if (matchingResultLetters.length < matchingWordOfTheDayLetters.length) {
          result[index] = {
            ...result[index],
            letter,
            color: 'yellow',
          }
        }
      }
    })

    // Set all other letters to none
    userWord.forEach((letter, index) => {
      if (!result[index].color) {
        result[index] = {
          ...result[index],
          letter,
          color: 'none',
        }
      }
    })

    // If word is guessed, set gameWon to true
    if (result.map((letter) => letter.color).every((color) => color === 'green')) {
      gameWon = true
    }

    word.show(result)

    // Start new round or end game
    if (currentRound < rounds && !gameWon) {
      round()
    } else {
      wordle.close()
    }
  })
}

// Close game
wordle.on('close', () => {
  if (gameWon) {
    messages.youWon(gameId, {unlimited: options.unlimited, currentRound, rounds})
  } else {
    console.log('Game over! The word was ' + wordOfTheDay.join(''))
  }
  process.exit(0)
})

// Start game
if (options.help) {
  messages.title()
  messages.help()
  process.exit(0)
} else if (options.date && options.random) {
  console.log("You can't choose a date in combination with the random flag")
  process.exit(0)
} else if (options.spoiler) {
  word.show(
    wordOfTheDay.map((letter) => {
      return { letter, color: 'green' }
    })
  )
  process.exit(0)
} else {
  // Start game
  messages.title()
  round()
}

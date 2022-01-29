const formattingCodes = {
  green: [30, 42],
  yellow: [30, 43],
  none: [1, 37, 40],
  reset: [0],
}

const format = (color = 'reset') => `\x1b[${formattingCodes[color].join(';')}m`
const endTile = () => format() + ' '
const insertSpaces = (num) => new Array(num + 1).join(' ')

const showWord = (result) => {
  let topBottom = ''
  let middle = ''

  result.forEach(({ color, letter }) => {
    topBottom += format(color) + insertSpaces(7) + endTile()
    middle += format(color) + insertSpaces(3) + letter + insertSpaces(3) + endTile()
  })

  console.log(`\n\n${topBottom}\n${middle}\n${topBottom}\n\n`)
}

module.exports = showWord

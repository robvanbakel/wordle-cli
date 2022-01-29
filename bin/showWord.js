const showWord = (result) => {
  let topBottom = ''
  let middle = ''

  result.forEach((item) => {
    switch (item.color) {
      case 'green':
        topBottom += `\x1b[30;42m       \x1b[0m `
        middle += `\x1b[30;42m   ${item.letter}   \x1b[0m `
        break
      case 'yellow':
        topBottom += `\x1b[43;30m       \x1b[0m `
        middle += `\x1b[43;30m   ${item.letter}   \x1b[0m `
        break
      default:
        topBottom += `\x1b[1;30;37m       \x1b[0m `
        middle += `\x1b[1;30;37m   ${item.letter}   \x1b[0m `
        break
    }
  })

  console.log('\n')
  console.log(topBottom)
  console.log(middle)
  console.log(topBottom)
  console.log('\n')
}

module.exports = showWord

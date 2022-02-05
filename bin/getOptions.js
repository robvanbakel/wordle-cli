const getOptions = () => {
  const options = {}

  // Convert arguments to options
  process.argv.slice(2).map((flag) => {
    const flagSplit = flag.split('=')

    if (/^--/.test(flagSplit[0])) {
      options[flagSplit[0].substring(2)] = flagSplit[1] || true
    } else if (/^-/.test(flagSplit[0])) {
      switch (flagSplit[0].substring(1)) {
        case 's':
          options['spoiler'] = true
          break
        case 'h':
          options['hard'] = true
          break
        case 'r':
          options['random'] = true
          break
        case 'u':
          options['unlimited'] = true
          break
        case 'd':
          options['date'] = flagSplit[1]
          break
        case 'w':
          options['word'] = flagSplit[1]
          break
      }
    }
  })

  // Reformat Date option
  if (options.date) options.date = new Date(options.date.split('-').reverse().join('-'))

  return options
}

module.exports = getOptions

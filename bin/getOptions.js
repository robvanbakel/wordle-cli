const getOptions = () => {
  const options = {};

  // Convert arguments to options
  process.argv.slice(2).forEach((option) => {
    const flagSplit = option.split('=');

    if (/^--/.test(flagSplit[0])) {
      options[flagSplit[0].substring(2)] = flagSplit[1] || true;
    } else if (/^-/.test(flagSplit[0])) {
      flagSplit[0]
        .substring(1)
        .split('')
        .forEach((flag) => {
          switch (flag) {
            case 's':
              options.spoiler = true;
              break;
            case 'h':
              options.hard = true;
              break;
            case 'r':
              options.random = true;
              break;
            case 'u':
              options.unlimited = true;
              break;
            case 'g':
              [options.guesses] = flagSplit;
              break;
            case 'd':
              [options.date] = flagSplit;
              break;
            case 'w':
              [options.word] = flagSplit;
              break;
            default:
              break;
          }
        });
    }
  });

  // Reformat Date option
  if (options.date) options.date = new Date(options.date.split('-').reverse().join('-'));

  // Check guesses option
  if (options.guesses === '0') options.unlimited = true;
  if (!parseInt(options.guesses, 10)) delete options.guesses;

  return options;
};

module.exports = getOptions;

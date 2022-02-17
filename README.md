# Wordle CLI

### Install

```
npm i -g wordle-cli
```

### How to play

Try to guess the 5-letter word! After each round, you'll see the results, which are color-coded. Take the results into account when entering your next word and try to guess the selected word within six rounds.

* A green tile means that the letter is guessed correctly.

* A yellow tile means that the letter appears in the word, but is in the wrong place.

* When a tile is not colored, that letter does not appear in the word.

To start the game, run `wordle` in your command line and guess your first word! To display a help message, including a manual and options, add the `--help` flag.

### Options

`-d` `--date` `<DD-MM-YYYY>`: Choose a date to play with the correspondig word

`-h` `--hard`: Disable yellow tiles from the results

`-r` `--random`: Play with a randomly selected word

`-g` `--guesses` `<number>`: Set a custom amount of rounds for a game

`-s` `--spoiler`: Show the word of the day immediately

`-u` `--unlimited`: Disable the maximum of 6 rounds per game

`-w` `--word` `<word>`: Manually choose a word to play with

### Credits

This is command line interpretation of Wordle, created by [Rob van Bakel](https://github.com/robvanbakel). The original game was created by Josh Wardle ([@powerlanguish](https://twitter.com/powerlanguish)) and is available on [www.nytimes.com/games/wordle](https://www.nytimes.com/games/wordle).

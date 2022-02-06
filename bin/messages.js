module.exports = {
  title() {
    console.clear()
    console.log(`

     **       **    *******    *******    *******    **        ********
    /**      /**   **/////**  /**////**  /**////**  /**       /**///// 
    /**   *  /**  **     //** /**   /**  /**    /** /**       /**      
    /**  *** /** /**      /** /*******   /**    /** /**       /******* 
    /** **/**/** /**      /** /**///**   /**    /** /**       /**////  
    /**** //**** //**     **  /**  //**  /**    **  /**       /**      
    /**/   ///**  //*******   /**   //** /*******   /******** /********
    //       //    ///////    //     //  ///////    ////////  //////// 
    
    `)
  },
  youWon(gameId, rounds) {
    let stats

    if (gameId && !rounds.unlimited) {
      stats = `worlde #${gameId} ${rounds.currentRound}/${rounds.rounds}`
    } else if (gameId) {
      stats = `  worlde #${gameId}  `
    } else if (!rounds.unlimited) {
      stats = `   worlde ${rounds.currentRound}/${rounds.rounds}  `
    } else {
      stats = `               `
    }

    console.log(`      
      _____________________________
    /  \\                           \\
    |   |                           |
      \\_|      CONGRATULATIONS      |
        |      ${stats}      |
        |                           |
        |     \x1b[33m   ___________   \x1b[0m     |
        |     \x1b[33m  '._==_==_=_.'  \x1b[0m     |
        |     \x1b[33m  .-\\:      /-. \x1b[0m      |
        |     \x1b[33m | (|:.     |) | \x1b[0m     |
        |     \x1b[33m  '-|:.     |-'  \x1b[0m     |
        |     \x1b[33m    \\::.    /   \x1b[0m      |
        |     \x1b[33m     '::. .'     \x1b[0m     |
        |     \x1b[33m       ) (       \x1b[0m     |
        |     \x1b[33m     _.' '._     \x1b[0m     |
        |     \x1b[33m    '"""""""'    \x1b[0m     |
        |                           |
        |   ________________________|___
        |  /                           /
        \\_/___________________________/

   `)
  },
  help() {
    console.log(`
    
\x1b[1mHOW TO PLAY\x1b[0m

    Try to guess the 5-letter word! After each round, you'll see the results,
    which are color-coded. Take the results into account when entering your
    next word and try to guess the selected word within six rounds.
    
      - A green tile means that the letter is guessed correctly.

      - A yellow tile means that the letter appears in the word, but is in
        the wrong place.

      - When a tile is not colored, that letter does not appear in the word.

    To start the game, run \x1b[1mwordle\x1b[0m and guess your first word!

\x1b[1mOPTIONS\x1b[0m

    -d --date <DD-MM-YYYY> : Choose a date to play with the correspondig word
    -h --hard              : Disable yellow tiles from the results
    -r --random            : Play with a randomly selected word
    -g --guesses <number>  : Set a custom amount of rounds for a game
    -s --spoiler           : Show the word of the day immediately
    -u --unlimited         : Disable the maximum of 6 rounds per game
    -w --word <word>       : Manually choose a word to play with

\x1b[1mCREDITS\x1b[0m

    This is command line interpretation of Wordle, created by Rob van Bakel.
    The original game was created by Josh Wardle (@powerlanguish).
    
    `)
  },
}

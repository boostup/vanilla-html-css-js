(function(win, doc) {
  
  "use strict";


  //--------------------------------------------------
  // Namespacing
  //--------------------------------------------------
  win.FHB.RockPaperScissors = RockPaperScissorsLogic;


  /**
   * All possible outcomes / messages of the game, stated in plain english.
   * Has the advantage to easily support multiple languages in the future.
   * Makes app easily extensible with additional outcomes / messages.
   * This object is 'private' to this 'class'.
   * @type {Object}
   */
  var outcomeMessages  = {
      rock: {
        rock: {title:"it's a tie", message: "let's try again..."},
        paper: {title:"Player 1 lost", message: "the paper covered the rock!"},
        scissors: {title:"Player 1 won", message: "the rock crushed the scissors!"}
      },
      paper: {
        rock: {title:"Player 1 won", message: "the paper covered the rock!"},
        paper: {title:"it's a tie", message: "let's try again..."},
        scissors: {title:"Player 1 lost", message: "the scissors cut the paper out!"}
      }, 
      scissors: {
        rock: {title:"Player 1 lost", message: "the rock crushed the scissors!"},
        paper: {title:"Player 1 won", message: "the scissors cut the paper out!"},
        scissors: {title:"it's a tie", message: "let's try again..."}
      },                 
    };
  
  /**
   * This is the heart of the game.  It returns the outcome message according the card names 
   * passed by parameter.  
   * It is a 'private' method.
   * @param  {String}
   * @param  {String}
   * @return {String}
   */
  function generateMessage(cardName1, cardName2) {
    return outcomeMessages[cardName1][cardName2];
  }

  /**
   * @type {Constructor}
   * @param {Object} please refer to the helpers.js file
   */
  function RockPaperScissorsLogic(errorHandling, helpers) {

    this.errorHandling    = errorHandling;
    this.helpers          = helpers;

    /**
     * The available moves.
     * Makes app easily extensible with additional outcomes / messages.
     * @type {Array}
     */
    this.possibleMoves    = [
      {name: "rock", value:1}, 
      {name: "paper", value:2}, 
      {name: "scissors", value:3}
    ];

    /**
     * The total number of available moves.
     * @type {int}
     */
    this.TOTAL_MOVES      = this.possibleMoves.length;    

  }

  /**
   * This method is used to get the string name of random card.
   * @return {String}
   */
  RockPaperScissorsLogic.prototype.getRandCardName = function() {
    this.helpers.shuffle( this.possibleMoves );
    return this.possibleMoves[ Math.round( Math.random() * ( this.TOTAL_MOVES - 1 ) ) ].name;
  }

  /**
   * This is the heart of the game.  It returns the outcome message according the card names 
   * passed by parameter.  
   * It is a 'public' method.
   * @param  {String}
   * @param  {String}
   * @return {String}
   */
  RockPaperScissorsLogic.prototype.evaluate = function(cardName1, cardName2) {

    this.errorHandling.enforceString(cardName1);
    this.errorHandling.enforceString(cardName2);
    //console.log(diff, this.generateMessage(item1, item2));
    return generateMessage(cardName1, cardName2);
  }

})(window, document);




  (function(win, doc) {
  
  "use strict";


  //--------------------------------------------------
  // Namespacing
  //--------------------------------------------------  
  win.FHB.RPSApp = Application;


  /**
   * @type {Constructor}
   * @param {Object}      errorHandling
   * @param {Object}      helpers
   * @param {Constructor} RockPaperScissors
   */
  function Application(errorHandling, helpers, RockPaperScissors) {

    /**
     * dependencies
     */
    this.errorHandling          = errorHandling;    
    this.helpers                = helpers;
    this.gameLogic              = new RockPaperScissors(errorHandling, helpers);

    /**
     * The list of HTML elements to be displayed one after the other
     * @type {Array}
     */
    this.elsToDisplayAtStart    = [];

    /**
     * Just a list of listeners. Please refer to 'addListener' & 'destroyListeners' methods for more details.
     * @type {Array}
     */
    this.listeners              = [];
    
    /**
     * Just a list of timers.
     * @type {Array}
     */
    this.timers                 = [];
    
    /**
     * The complete onscreen area of the game.
     * @type {HTMLElement}
     */
    this.gameArea               = doc.getElementById("gameArea");
    
    /**
     * The modal box which appears when the game ends
     * @type {HTMLElement}
     */
    this.modal                  = doc.getElementById("modalOverlay");
    
    /**
     * Displays the title of the modal
     * Note: 'title' is reserved and causing a bug, so changing it to 'modal.modalTitle'
     * @type {HTMLElement}
     */
    this.modal.modalTitle       = this.modal.querySelector(".title");
    
    /**
     * Displays the message of the modal
     * @type {HTMLElement}
     */
    this.modal.message          = this.modal.querySelector(".msg");
    
    /**
     * This button restarts the game when pressed
     * @type {HTMLElement}
     */
    this.modal.restartButton    = this.modal.querySelector("button");
    
    /**
     * This button starts a 'CPU vs CPU' game when pressed
     * @type {HTMLElement}
     */
    this.automaticPlayBtn       = doc.getElementById("automaticPlayBtn");
    
    /**
     * The area where the selected cards will be laid on (after selection)
     * @type {HTMLElement}
     */
    this.board                  = doc.getElementById("board");

    /**
     * The card placeholder for player 1
     * @type {HTMLElement}
     */
    this.placeholder1           = doc.getElementById("placeholder1");

    /**
     * The area where the available cards are initially laid (before selection)
     * @type {HTMLElement}
     */
    this.deck                   = doc.getElementById("deck");

    /**
     * The card selected for player 1
     * @type {HTMLElement} 
     */
    this.playerCard;

    /**
     * The card selected for player 2
     * @type {HTMLElement}
     */
    this.CPUCard;    

    /**
     * Paper card
     * @type {HTMLElement}
     */
    this.paperCard              = doc.getElementById("paperCard");    

    /**
     * Rock card
     * @type {HTMLElement}
     */    
    this.rockCard               = doc.getElementById("rockCard");

    /**
     * Scissors card
     * @type {HTMLElement}
     */       
    this.scissorsCard           = doc.getElementById("scissorsCard");   

    /**
     * Just an element that holds the text 'VS' (for 'versus')
     * @type {HTMLElement}
     */
    this.versus                 = doc.getElementById("versus");
  };
  
  /**
   * Application initialization
   */
  Application.prototype.init = function() {
    this.prepareHTMLNodes();
    this.setBehaviours();
  }  

  /**
   * Adds event listeners to the element passed by parameter.
   * Every new listener is pushed into the list of listeners.
   * @param {HTMLElement}
   * @param {String}
   * @param {Function}
   */
  Application.prototype.addListener = function(el, evtName, fn) {

    this.errorHandling.enforceHTMLElement(el);
    this.errorHandling.enforceString(evtName);
    this.errorHandling.enforceFunction(fn);

    el.addEventListener(evtName, fn);
    this.listeners.push(
      {
        el: el,
        fn: fn
      }
    );
  } 

  /**
   * This method is used to destroy the complete set of listeners
   * held in the list of listeners.
   */
  Application.prototype.destroyListeners = function() {
    this.listeners.map( function( item, i ) {
      item.el.removeEventListener(
        item.el, 
        item.fn
      );
    }.bind(this));    
  }
  
  /**
   * Creates a new timer.
   * Every new timer is pushed into the list of timers.
   * @param {int} the number of milliseconds by which to trigger the timer
   * @param {Function} the function to call when timer is triggered
   */
  Application.prototype.setTimer = function(ms, fn) {

    this.errorHandling.enforceInt(ms);
    this.errorHandling.enforceFunction(fn);

    this.timers.push(
      setTimeout(fn ,ms)
    );
  }
  
  /**
   * This method is used to destroy the complete set of timers
   * held in the list of timers.
   */
  Application.prototype.destroyTimers = function() {
    this.timers.map( function( timer, i ) {
      clearTimeout(timer);
    });
  }
  
  /**
   * This methods wires up the different behaviours / interactions
   * required to play this game.
   */
  Application.prototype.setBehaviours = function() {
    this.onTransitionEnd();
    this.onCardPicked();   
    this.onCPUVsCPU();
    this.onRestartButtonPressed(); 
  }     
  
  /**
   * This method calls the relevant methods to prepare everything for start up effects
   */
  Application.prototype.prepareHTMLNodes = function() {
    this.elsToDisplayAtStart = this.getElementsToDisplayAtStart( "displayMeAtStart" );
    this.setDisplayAtStartClass( "fadeable" );
  }
   
  /**
   * This method gathers up in a list the HTML elements that will be displayed one after the other
   * @param  {String}
   * @return {Array}
   */
  Application.prototype.getElementsToDisplayAtStart = function(className) {

    this.errorHandling.enforceString(className);

    var elColl = this.helpers.fromHTMLCollectionToArray( doc.getElementsByClassName( className ) );
    elColl.push( doc.getElementById( "gameTitle" ) );
    elColl.push( doc.getElementById( "automaticPlayBtn" ) );
    return elColl;
  }  
  
  /**
   * Sets a fade in effect on the HTML element passed by parameter.
   * @param  {int} the duration of the effect in milliseconds
   * @param  {HTMLElement}
   */
  Application.prototype.fadeIn = function( ms, el ) {

    this.errorHandling.enforceInt(ms);
    this.errorHandling.enforceHTMLElement(el);

    this.setTimer(
      ms,
      function() {
        this.helpers.fadeIn(el);
      }.bind(this)
    );    
  }
  
  /**
   * Sets a vertical translation on the HTML element passed by parameter.
   * @param  {int} the duration of the effect in milliseconds 
   * @param  {HTMLElement}
   * @param  {int} the number of pixels to translate / slide to
   * @return {[type]}
   */
  Application.prototype.slideVertical = function( ms, el, amount) {

    this.errorHandling.enforceInt(ms);
    this.errorHandling.enforceHTMLElement(el);    

    //default
    if(!amount) amount = 25;

    this.setTimer(
      ms,
      function() {
        this.helpers.slideVertical(el, amount);
      }.bind(this)
    );      
  }
  
  /**
   * This method adds the required CSS class for the desired visual effect (currently 'fadeIn')
   * to each HTML element to display, one after the other, during startup.
   * @param {String}
   */
  Application.prototype.setDisplayAtStartClass = function( className ) {

    this.errorHandling.enforceString(className);

    this.elsToDisplayAtStart.map( function( currEl, i ) {
      currEl.classList.add( className );
      this.fadeIn(
        (i+1) * 700, 
        currEl
      );
    }.bind(this));  
  }
  
  /**
   * Currently unused.
   * Helps detecting the end of CSS transition effect.
   */
  Application.prototype.onTransitionEnd = function() {
    this.addListener(doc, 'transitionend', function() {
      //console.log('transition ended! Not actually used for anything right now...');
    }.bind(this));    
  }
  
  /**
   * This method sets up the required event callback which triggers when the user actually 
   * selects (by clicking or tapping on) a card, on the deck.
   * This is player 1 card on a 'manual' game.
   */
  Application.prototype.onCardPicked = function() {
    this.addListener(doc, this.helpers.CLICK_EVENT, function(evt) {

      var pickedCard = this.helpers.contains( "card", evt.target );

      //Avoiding clicks on the placeholder cards found on the board
      if(!this.getCardValue(pickedCard)) return

      if( pickedCard ) {
        this.pickPlayerCard(pickedCard);
        this.pickCPUCard();        
        this.executeGame();
      }
    }.bind(this));    
  }  

  /**
   * Whether the game is in 'manual' or 'automatic' mode, this is
   * the sequence to execute to finish the game
   */
  Application.prototype.executeGame = function() {
    this.pickCPUCard();  
    this.displayBoard();
    this.placeCardsOnBoard();
    this.gameOver();    
  }

  /**
   * This method sets up the required event callback which triggers when the user actually
   * clicks on the "restart" button found inside the modal box.
   */
  Application.prototype.onRestartButtonPressed = function() {
    this.addListener(
      this.modal.restartButton, 
      this.helpers.CLICK_EVENT,
      this.restart.bind(this)
    );    
  }
  
  /**
   * This method displays the board right before the selected cards appear on screen
   */
  Application.prototype.displayBoard = function() {
    this.board.style.display = "flex";
    this.fadeIn(400, this.board);    
  }
  
  /**
   * This method is used to set the selected card for player 1.
   * @param  {HTMLElement}
   */
  Application.prototype.pickPlayerCard = function(cardEl) {

    this.errorHandling.enforceHTMLElement(cardEl);

    this.playerCard = cardEl;
    //console.log("Player picked card: ", this.getCardValue( this.playerCard ) );
  }  
  
  /**
   * This method is used to set the selected card for player 2.
   * @TODO: this method does too much! Will it be difficult to test with Jasmine?
   */
  Application.prototype.pickCPUCard = function() {
    var cardName = this.gameLogic.getRandCardName();
    //console.log("computer picked card: ", cardName);
    this.CPUCard = this.getCardElByName(cardName);
    if( this.CPUCard === this.playerCard ) {
      this.CPUCard = this.playerCard.cloneNode(true);
    }
    this.CPUCard.querySelector(".inner").style.background = 'grey';
    //console.log("CPU picked card: ", this.CPUCard);
  }       
  
  /**
   * This method is used to position the selected cards on the board with visual effects.
   */
  Application.prototype.placeCardsOnBoard = function() {
    this.placeCard(this.playerCard);
    this.board.appendChild(this.versus);
    this.placeCard(this.CPUCard);
    
    this.slideVertical(400, this.playerCard);
    this.slideVertical(700, this.CPUCard);
  }
  
  /**
   * This method is used to position the card HTML element passed by parameter on the board.
   * It also set the CSS class to prepare it for the visual effects (currently CSS transitions).
   * @param  {HTMLElement}
   */
  Application.prototype.placeCard = function(cardEl) {

    this.errorHandling.enforceHTMLElement(cardEl);

    this.board.appendChild(cardEl);
    cardEl.classList.add("slideable");
  }

  /**
   * This method is used to retrieve the String value which identifies the type of card 
   * ('rock', 'paper', or 'scissors' only at the moment)
   * @param  {HTMLElement}
   * @return {String}
   */
  Application.prototype.getCardValue = function(cardEl) {

    if(!cardEl || !cardEl.getAttribute) return;
    
    return cardEl.getAttribute("data-card-type");       
  }
  
  /**
   * This method executes the necessary steps to end the game.
   */
  Application.prototype.gameOver = function() {
    this.gameArea.classList.add("gameOver");
    this.deck.classList.add("hidden");
    this.modal.style.display = 'flex';

    var playerCardName  = this.getCardValue(this.playerCard),
        CPUCardName     = this.getCardValue(this.CPUCard),

        gameResultText  = this.gameLogic.evaluate(
                            playerCardName,
                            CPUCardName
                        );

    this.setModalText(gameResultText.title, gameResultText.message);

    this.slideVertical(1900, this.modal, -47);  
  }

  /**
   * Sets the title and message body texts of the modal box.
   * @param {String}
   * @param {String}
   */
  Application.prototype.setModalText = function(title, body) {

    this.errorHandling.enforceString(title);
    this.errorHandling.enforceString(body);

    this.setModalTitle(title);
    this.setModalMsg(body);
  }

  /**
   * Set the title text of the modal box
   * @param {String}
   */
  Application.prototype.setModalTitle = function(text) {

    this.errorHandling.enforceString(text);

    this.modal.modalTitle.innerText = text; 
  }

  /**
   * Set the body text of the modal box
   * @param {String}
   */
  Application.prototype.setModalMsg = function(text) {

    this.errorHandling.enforceString(text);

    this.modal.message.innerText = text;    
  }
  
  /**
   * This method is used to restart the game
   */
  Application.prototype.restart = function() {

    this.destroyTimers();
    this.destroyListeners();

    //put cards back on the deck on the same order as initially laid out (Rock, Paper, Scissors)
    //hide board
    //Hide modal
    //...
    //hum... I think I'll just reload the document, because since we're in a browser, we get all 
    //that for free => much easier ;)
    doc.location.reload();
    
  }

  /**
   * This method returns the HTML element (card) corresponding to the name passed by parameters
   * @param  {String}
   * @return {HTMLElement or null}
   */
  Application.prototype.getCardElByName = function(cardName) {

    this.errorHandling.enforceString(cardName);

    //@TODO: maybe a 'checkValidMove' on gameLogic object to check if string is either 
    //'rock', 'paper', 'scissors'...
    return this[ cardName + 'Card' ] || null;
  }

  /**
   * This is the method called to perform an 'automatic' game 
   */
  Application.prototype.executeCPUVsCPU = function() {
    var card1El = this.getCardElByName( this.gameLogic.getRandCardName() );
    this.placeholder1.querySelector('.name').innerText = "CPU";
    this.pickPlayerCard(card1El);
    this.executeGame();
    //console.log(this.playerCard, this.CPUCard);
  }

  /**
   * This method sets up the required event callback which triggers when the user actually 
   * pressed the button 'CPU Vs CPU'
   */
  Application.prototype.onCPUVsCPU = function() {
    this.addListener(
      this.automaticPlayBtn, 
      this.helpers.CLICK_EVENT,
      this.executeCPUVsCPU.bind(this)
    );
  }


})(window, document);












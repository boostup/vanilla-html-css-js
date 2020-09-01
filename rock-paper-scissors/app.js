(function(win, doc) {
  
  "use strict";


    /**
   * Retrieving errorHandling object
   * @type {object}
   */
  var errorHandling = win.FHB.errorHandling;

  /**
   * Retrieving Helpers object
   * @type {object}
   */
  var helpers = win.FHB.helpers;

  /**
   * Retrieving RockPaperScissors 'class'
   * This contains the logic of the Rock Paper Scissors logic
   */
  var RockPaperScissors = win.FHB.RockPaperScissors;  

  /**
   * Retrieving the application 'class'
   * This mostly handles UI concerns
   */
  var Application = win.FHB.RPSApp;
  

  //--------------------------------------------------
  // Dependency injection
  //--------------------------------------------------  
  var app     = new Application(
                      errorHandling,
                      helpers,
                      RockPaperScissors
                    );

  //--------------------------------------------------
  // Bootstrapping application
  //--------------------------------------------------
  win.onload  = app.init.bind(app);

})(window, document);







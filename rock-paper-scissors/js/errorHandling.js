(function(win, doc) {
  
  "use strict";



  //--------------------------------------------------
  // Namespacing
  //--------------------------------------------------
  win.FHB.errorHandling = {
    enforceArray      : enforceArray,
    enforceFunction   : enforceFunction,
    enforceHTMLElement: enforceHTMLElement,
    enforceInt        : enforceInt,
    enforceString     : enforceString,
  }

  /**
   * Throws an error if the argument is not an array
   * @param  {any}
   */
  function enforceArray( arr ) {
    if( !( arr instanceof Array ) )
      throw new Error( "the argument must be an instance of Array" );
  } 

  /**
   * Throws an error if the argument is not a function
   * @param  {any}
   */
  function enforceFunction( fn ) {
    if( !( fn instanceof Function) )
      throw new Error( "the argument must be an instance of Function" );
  }
  
  /**
   * Throws an error if the argument is not an HTML element
   * @param  {any}
   */
  function enforceHTMLElement( el ) {
    if( !( el instanceof HTMLElement) && !( el instanceof HTMLDocument ) )
      throw new Error( "the argument must be an instance of HTMLDocument, HTMLElement, or any descendants" );
  }

  /**
   * Throws an error if the argument is not an integer
   * @param  {any}
   */
  function enforceInt( val ) {
    if( 
        ( typeof val !== "number" ) || 
        ( val % 1 ) !== 0 
      )
      throw new Error( "the argument must be an int" );
  }
  
  /**
   * Throws an error if the argument is not a string
   * @param  {any}
   */
  function enforceString( val ) {
    if( typeof val !== "string" )
      throw new Error( "the argument must be a string" );
  }

})(window, document);



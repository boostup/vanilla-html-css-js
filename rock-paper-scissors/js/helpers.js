(function(win, doc) {
  
  "use strict";

  /**
   * This is the string name of the event required to handle a click
   * whether on a touch or non-touched devices.
   * @type {String}
   */
  var CLICK_EVENT = getVendorTouchStartEvent();

  //--------------------------------------------------
  // Namespacing
  //--------------------------------------------------
  win.FHB.helpers = {
    CLICK_EVENT               : CLICK_EVENT,
    fromHTMLCollectionToArray : fromHTMLCollectionToArray,
    fadeIn                    : fadeIn,
    slideVertical             : slideVertical,
    contains                  : contains,
    shuffle                   : shuffle,
  }

  /**
   * Determining the correct Touch/Click event, according to the device this code runs on.
   * @return {String}
   */
  function getVendorTouchStartEvent() {
    var evtType;
    if ('ontouchstart' in window) {
      evtType = 'touchstart';
    } else if (window.navigator.pointerEnabled) {
      evtType = 'pointerdown';
    } else if (window.navigator.msPointerEnabled) {
      evtType = 'MSPointerDown';
    } else {
      evtType = 'click';
    }
    return evtType;
  }
  

  /**
   * Converting HTMLCollection to a regular Array.
   * Why ? because an HTMLCollection as a more restricted API than a real Array
   * @param  {HTMLCollection}
   * @return {Array}
   */
  function fromHTMLCollectionToArray(HTMLColl) {
    return [].slice.call(HTMLColl);
  }

  /**
   * This applies the required CSS class to achieve the effect on the HTML element passed
   * by parameter.
   * @param  {HTMLElement}
   */
  function fadeIn(el) {
    el.classList.remove("hidden");
    el.classList.add("visible");
  }  
  
  /**
   * This applies the required CSS changes to achieve the effect on the HTML element passed
   * by parameter.
   * @param  {HTMLElement}
   */  
  function slideVertical(el, amount) {
    el.style.opacity = 1;   
    el.style.transform = "translate3D(0, " + amount + "px, 0)";
  }
  
  /**
   * Gathers a list of all the HTML elements that have got the CSS class passed by parameter.
   * In this list, it look for the one elements which contains the HTML element passed by parameter.
   * @param  {String}
   * @param  {HTMLElement}
   * @return {bool or HTMLElement}
   */
  function contains(containerClass, el) {
    var retVal = false,
    containers = fromHTMLCollectionToArray(document.getElementsByClassName(containerClass));
    containers.map(function(currEl, i){
      if(currEl.contains(el)) retVal = currEl;
    });
    return retVal;
  }  

  /**
   * Algorithm used to shuffle an Array.
   * Credits: Fisher-Yates shuffle by Ronald Fisher.  https://www.frankmitchell.org/2015/01/fisher-yates/
   * @type {[type]}
   */
  function shuffle (array) {
    var i = 0
      , j = 0
      , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }  

  /**
   * Fixing the 'modulo bug' in JS. Credits: http://javascript.about.com/od/problemsolving/a/modulobug.htm
   * example of use:  (0-3).mod(5) = 2
   * without this fix, (0-3) % 5 = -3, which is incorrect.
   */
  Number.prototype.mod = function(n) { return ((this%n)+n)%n; } 

})(window, document);



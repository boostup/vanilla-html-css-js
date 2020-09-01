# PLATFORM SUPPORT #

The Game has been manually tested on the following and is found to be working identically :

  - **Touch**:
    - Safari and Chrome on iOS 9.3.1 (iPad 2 and iPhone 4S)
    - Chrome on Android 5.0.2 (Huawei Honor 7)

  - **Non-touch**:
    - Safari and Chrome on Mac OS, 
    - IE11 and Chrome on windows 7,

  Note: On these devices, Chrome and Safari are updated to the latest current stable version.

--------------------------------------------------
# Things worth mentioning #

- About the user stories:

     - I did not understand the part that says: 'Can I play a different game each time? '.  I'm not sure whether my game complies with this or not...

--------------------------------------------------


# Component definition without a library like RequireJS #

One workaround technique I commonly use is to simulate namespaces, polluting the global space only with an 'FHB' (for Fred H. Beauvois) variable on the global object ('window' in the browser, or 'global' for NodeJS).  

For example : 

     - FHB.Application
     - FHB.Deck
     - FHB.Board
     - FHB.Card
     - FHB.Helpers
     - FHB.RockPaperScissorsLogic
     - ...

However, I truly believe that, in this very particular game, this amount of components is an engineering overkill, so I only defined the following components:

     - FHB.helpers
     - FHB.Application
     - FHB.RockPaperScissors

--------------------------------------------------
# Scalability #

Should the app grow further I would :

 - use a state machine pattern (but since we're running this in a browser, I can cheat by using 'location.reload' in order to reset the app to its original state (WAITING_FOR_PLAYER_CHOICE) => HUGE quick win here)
 - use a chaineable animations API
 - Should we wish to add 'Spoke' and 'Lizard' to the game, the following should be considered to achieve it:
     - **RockPaperScissors.js** 
          1. add 2 new entries in the 'possibleMoves' array
          2. add all the missing outcome messages to the 'outcomeMessages'
     - **index.html**
          1. add the relevant HTML for cards, inside the div with id="deck"
     - **RockPaperScissorsSpec.js**
          1. modify impacted specs

-------------------------
# Unit Testing #

## Material read ##

- [Getting started with Javascript testing using Jasmine](http://www.ontestautomation.com/getting-started-with-javascript-testing-using-jasmine/)

- [Introduction to Jasmine](http://jasmine.github.io/2.4/introduction.html)

- [writing great unit tests, best and worst practices](http://blog.stevensanderson.com/2009/08/24/writing-great-unit-tests-best-and-worst-practises/)

- [5 questions every unit test must answer](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d#.2xspk6ac4) 
    
## Conclusions on writing good unit tests ##

- unit tests are **a design specification** of how a certain behaviour should work, **not a list of observations** of everything the code happens to do
     
- **a test-first process produces better results than adding tests later**

- when I write a test, I must answer these questions:

     - What are you testing?
     - What should it do?
     - What is the actual output?
     - What is the expected output?
     - How can the test be reproduced?

## Status of project test suite ##

- Have written a little suite of tests for the RockPaperScissors.js file.
- Will try to continue and write another suite for the Application.js file throughout the week

## Running the tests (or 'specs' in the world of Jasmine) ##

- Just open in your browser the *SpecRunner.html* file found at the root of the project.
 
-------------------------
# Coding philosophy and style #

**Note**: I will adapt to any company's internal coding style guide ! These are just things I've picked up along the years...

[And here is style guide by John Papa, I very much like](https://github.com/johnpapa/angular-styleguide)


- When I code, I prefer high readibility over complicated algorithms or 'one-liners'.  In case there is a bug which needs 
  quick solving, any other coder can quickly understand what the code does and fix it.

- In general, it is said that using HTML id's isn't good, but in the case of a game, it is something we can't go without...
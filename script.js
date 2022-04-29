'use strict';

// Selecting elements
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player = document.querySelectorAll('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

//state variable
/* 
- YOU CAN PUT EMPTY VARIABLES ALL TOGETHER SEPARATED BY COMMAS.
- THIS VARIABLES WILL BE GIVEN A VALUE ONCE THE INIT FUNCTION IS RUN
- INIT FUNCTION IS SET TO RUN WHEN THE PAGE IS REFRESHED OR WHEN THE NEWGAME BUTTON IS CLICKED
-- NEWGAME IS LISTENING FOR A CLICK THAT WILL TRIGGER THE VARIABLE INIT WHICH CONTAINS A FUNCTION WHICH WILL RESET THE GAME
-- SEE HOW INIT FUNCTION IS ONE OF THE ARGUMENTS FOR THE EVEN HANDLER BUT IT IS WITHOUT () BECAUSE YOU ONLY WANT TO RUN IT WHEN THE TRIGGER HAPPENS IF YOU PUT PARENTHESIS IT WILL RUN AUTOMATICALLY 
-- ALSO THE NEWGAME EVENT LISTENER DOESNT HAVE {} DEFINED BECAUSE THE INIT FUNCTION WILL RUN THE CODE SO NO NEED TO {} SPECIFY ANOTHER BLOCK OF CODE.

*/

/*
you can put empty variables all together separated by commas
this variables will be given a value one the 
*/
let scores, activePlayer, currentScore, playing;
// let playing = true;

// btn variables
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
// const activePlayer = classList.contains('player--active');

// const scores = [0, 0];
// let activePlayer = 0;
// let currentScore = 0;

// INITIAL STATE
score0.textContent = 0;
score1.textContent = 0;

// variables with functions
const init = function () {
  let whosTurn = Math.round(Math.random());
  console.log(whosTurn);
  playing = true;
  scores = [0, 0];
  activePlayer = whosTurn;
  currentScore = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

newGameBtn.addEventListener(
  'click',
  init
  // playing = true;
  // activePlayer = 0;
  // currentScore = 0;
  // scores.pop();
  // scores.push(0);
  // scores.shift();
  // scores.unshift(0);
  // score0.textContent = scores[0];
  // score1.textContent = scores[1];
  // current0.textContent = currentScore;
  // current1.textContent = currentScore;
  // diceEl.classList.add('hidden');
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');

  // if (player0.classList.contains('player--winner')) {
  //   player0.classList.remove('player--winner');
  // } else {
  //   player1.classList.remove('player--winner');
  // }

  // activePlayer === 0
  //   ? player0.classList.remove('player--winner')
  //   : player1.classList.remove('player--winner');
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--winner');
  // console.log(`newGameBtn ${activePlayer}`);
);

holdBtn.addEventListener('click', function () {
  if (playing) {
    // add score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // active player scores >= 100?

    if (scores[activePlayer] >= 20) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // switch player
      switchPlayer();
    }
    console.log(`holdBtn ${activePlayer}`);
  }
});

// ROLLING DICE FUNCTION

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // 1. Generating Random number
    const dice = Math.floor(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
    console.log(`rollDiceBtn ${activePlayer}`);
  }
});

/* below is how you did it.
// HOLD BUTTON

holdBtn.addEventListener('click', function () {
  let scores0 = currentScore + scores[0];
  let scores1 = currentScore + scores[1];
  console.log(scores0);
  if (player0.classList.contains('player--active')) {
    scores.shift();
    scores.unshift(scores0);
    score0.textContent = scores[0];
  } else if (player1.classList.contains('player--active')) {
    scores.pop();
    scores.push(scores1);
    score0.textContent = scores[1];
  }
});

// NEW GAME BTN
newGameBtn.addEventListener('click', function () {
  score0.textContent = '0';
  score1.textContent = '0';
  diceEl.classList.add('hidden');
});

// ROLL DICE BTN
rollDiceBtn.addEventListener('click', function () {
  // generating random number
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  console.log(randomNumber);

  // displaying dice
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }
  diceEl.src = `dice-${randomNumber}.png`;

  // what happens if active player gets a 1
  if (randomNumber === 1 && player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
    currentScore = 0;
    current0.textContent = currentScore;
  } else if (
    randomNumber === 1 &&
    player1.classList.contains('player--active')
  ) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
    currentScore = 0;
    current1.textContent = currentScore;
  }
  // what happens when you don't get a 1
  if (randomNumber !== 1 && player0.classList.contains('player--active')) {
    currentScore += randomNumber;
    current0.textContent = currentScore;
  } else if (
    randomNumber !== 1 &&
    player1.classList.contains('player--active')
  ) {
    currentScore += randomNumber;
    current1.textContent = currentScore;
  }
});

// HOLD BTN

console.log(scores[0]);
*/

// test code

/*

** 

  if (randomNumber != 1 && player0.classList.contains('player--active')) {
    current0.textContent = randomNumber;
  } else if (
    randomNumber !== 1 &&
    player1.classList.contains('player--active')
  ) {
    current1.textContent = randomNumber;
  }

    // resetting current score
  // if (randomNumber === 1 && player0.classList.contains('player--active')) {
  //   currentScore = 0;
  //   current0.textContent = currentScore;
  // } else if (
  //   randomNumber === 1 &&
  //   player1.classList.contains('player--active')
  // ) {
  //   currentScore = 0;
  //   current1.textContent = currentScore;
  // }

  
  

*/

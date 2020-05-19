// THE GAME //

// ///////////////////////////////
// -- Create some functions -- //
// ///////////////////////////////

const tdsAreAdjacent = (clickedTd, emptyTd) => {
  // find the Y axis of the clicked TD
  const clickedTdY = clickedTd.cellIndex;
  // find the Y axis of the empty TD
  const emptyTdY = emptyTd.cellIndex;
  // find the difference of the axis
  const yAxisDifference = Math.abs(clickedTdY - emptyTdY);

  // Do the same for X axis
  const clickedTdX = clickedTd.parentElement.rowIndex;
  const emptyTdX = emptyTd.parentElement.rowIndex;

  const xAxisDifference = Math.abs(clickedTdX - emptyTdX);

  // if they are in the same Y axis and they have one X axis difference, they can move
  // if they are in the same X axis and they have one Y axis difference, they can move
  // return ((yAxisDifference === 0 && xAxisDifference === 1) ||
  // (yAxisDifference === 1 && xAxisDifference === 0))

  // Vinicius' refactoring
  const sum = xAxisDifference + yAxisDifference;
  return (sum === 1);
};


const moveThem = (clickedTd, emptyTd) => {
  // the empty one becomes the one that I clicked
  emptyTd.innerText = clickedTd.innerText;
  emptyTd.classList.remove('empty');

  // the one that I clicked becomes empty
  clickedTd.innerText = '';
  clickedTd.classList.add('empty');
};

// This is going to check if the game is over
const checkIfGameIsOver = () => {
  // We can't just compare two arrays in javascript -> array1 === array2
  // WHY? Homework 🤓
  // So, one of the easiest ways is to turn it into a string and compare the strings
  // That's what we're going to do

  const tds = document.querySelectorAll('td');
  let resultString = '';
  // tds.forEach(td => resultString += td.innerText);
  // if we do the above we'll have a bug! Which bug? Homework 🤓

  // So we need to add something to identify the empty one
  tds.forEach((td) => { resultString += `${td.innerText},`; });

  // then we can compare it to a string that represents the correct solution
  const finalString = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,,';
  return finalString === resultString;
};

const stopTheGame = () => {
  // alert that you won
  alert('You win!');
  // reload the page!
  location.reload();
};

// /////////////////////////////////////////////////
// -- Select Elements and Add Event listeners -- //
// /////////////////////////////////////////////////

// select all of my tds
const tds = document.querySelectorAll('td');

// for each of my tds
tds.forEach((td) => {
  // every time that I click on a td
  // element.addEventListener('EVENT', () => {});
  td.addEventListener('click', (event) => {
    // if they are adjacent
    const clickedTd = event.currentTarget;
    // This is for CLDD - Console Log Driven Development;
    // console.log(clickedTd);
    const emptyTd = document.querySelector('.empty');
    if (tdsAreAdjacent(clickedTd, emptyTd)) {
      console.log('They are adjacent!');
      moveThem(clickedTd, emptyTd);

      // if I have finished the game, STOP IT
      if (checkIfGameIsOver()) {
        stopTheGame();
      }
    } else {
      console.log('NOT ADJACENT!');
    }
  });
});


// /////////////////////////////////
// This is for showing the hint //
// ///////////////////////////////

// selecting the element
const hintBtn = document.querySelector('#show-hint');
// add an event listener
// hintBtn.addEventListener('EVENT', 'THE CALLBACK')

hintBtn.addEventListener('click', (event) => {
  // run my callback

  // How to find the BTN
  // const currentTarget = event.currentTarget;

  // first: find my element
  const hintText = document.querySelector('.hint');
  // second: change its opacity
  hintText.style.opacity = 1;
});

let booksRead = document.querySelector('#booksRead');
let booksGoal = document.querySelector('#booksGoal');
let currentDate = Date.now();
let endOfChallenge = new Date('December 31, 2021 23:59:59').getTime();
let oneDay = 1000 * 60 * 60 * 24;
let daysLeft = Math.round((endOfChallenge - currentDate) / oneDay);
let daysLeftDisplay = document.querySelector('#daysLeftDisplay');
let frequencyDisplayText = document.querySelector('#frequencyDisplayText');

const writeToLocalStorage = (goal, read) => {
  if (Storage !== undefined) {
    localStorage.setItem("goal", goal);
    localStorage.setItem("read", read);
  }
}

const getFromLocalStorage = (key) => {
  if (Storage !== undefined) {
    const storedVal = localStorage.getItem(key);
    if (storedVal !== null) {
      return storedVal;
    }
  }
  return "";
}

const updateFrequencyDisplayText = (bookFrequencyNum) => {
  //display message is empty by default
  let message = "";
  if (bookFrequencyNum > 0) {
    //still have books left to read
    message = `You need to finish a book every ${bookFrequencyNum} days`;
  } else if (bookFrequencyNum === 0) {
    //no books left to read
    message = "You have completed the goal!";
  }
  frequencyDisplayText.innerText = message;
}

function updateValuesFromLocalStorage() {
  booksGoal.value = getFromLocalStorage("goal");
  booksRead.value = getFromLocalStorage("read");
}

function updateDaysLeft() {
  daysLeftDisplay.innerText = daysLeft;
}

function bookFrequencyCalculate() {
  //-1 is an arbitray num. Passing a negative value to updateFrequencyDisplayText will make it display an empty string
  let bookFrequencyNum = -1;

  //parseInt replace erroneous values with empty string and decimals with int.
  booksRead.value = Number.parseInt(booksRead.value)
  booksGoal.value = Number.parseInt(booksGoal.value)

  //validate now => only books goal and read >= 0 are valid
  if (booksGoal.valueAsNumber >= 0 && booksRead.valueAsNumber >= 0) {
    //save valid nums to storage
    writeToLocalStorage(booksGoal.value, booksRead.value);
    //get num of books left to read
    let booksRemaining = parseInt(booksGoal.value) - parseInt(booksRead.value);
    if (booksRemaining > 0) {
      bookFrequencyNum = Math.floor(daysLeft / booksRemaining);
    } else {
      bookFrequencyNum = 0;
    }
  }
  updateFrequencyDisplayText(bookFrequencyNum);
}

updateValuesFromLocalStorage();
updateDaysLeft();
bookFrequencyCalculate();

booksRead.addEventListener('change', bookFrequencyCalculate);
booksGoal.addEventListener('change', bookFrequencyCalculate);

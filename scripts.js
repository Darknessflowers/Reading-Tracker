let booksRead = document.querySelector('#booksRead');
let booksGoal = document.querySelector('#booksGoal');
let currentDate = Date.now();
let endOfChallenge = new Date('December 31, 2021 23:59:59').getTime();
let oneDay = 1000*60*60*24;
let daysLeft = Math.round((endOfChallenge - currentDate)/oneDay);
let daysLeftDisplay = document.querySelector('#daysLeftDisplay');
let bookFrequencyDisplay = document.querySelector('#bookFrequencyDisplay');
let frequencyDisplayText = document.querySelector('#frequencyDisplayText');

const writeToLocalStorage = (val) => {
  if (Storage !== undefined){
    localStorage.setItem("goal", val);
  }
}

const getFromLocalStorage = () => {
  if (Storage !== undefined){
    const storedGoal = localStorage.getItem("goal");
    if (storedGoal != null){
      return storedGoal;
    }else{
      return "";
    }
  }
  return "";
}

const resetFrequencyDisplayTextParagraph = () => {
    frequencyDisplayText.innerHTML = "";
    const spanElement = document.createElement("span");
    spanElement.setAttribute('id', 'bookFrequencyDisplay');
    const youNeedToFinishTextNode = document.createTextNode("You need to finish a book every ");
    const daysTextNode = document.createTextNode(" days");
    frequencyDisplayText.appendChild(youNeedToFinishTextNode);
    frequencyDisplayText.appendChild(spanElement);
    frequencyDisplayText.appendChild(daysTextNode);
    bookFrequencyDisplay = document.querySelector('#bookFrequencyDisplay');
}

function updateGoalDate(){
  booksGoal.value = getFromLocalStorage();
}

function updateDaysLeft() {
  daysLeftDisplay.innerText = daysLeft;
}

function bookFrequencyCalculate() {
  let booksRemaining = parseInt(booksGoal.value - booksRead.value);
  if (booksGoal.value > 0){
    writeToLocalStorage(booksGoal.value);
  }
  if (booksRemaining > 0){
    resetFrequencyDisplayTextParagraph();
    let bookFrequencyNum = daysLeft / booksRemaining;
    bookFrequencyDisplay.innerText = Math.floor(bookFrequencyNum);
  }else if (booksGoal.value != 0 && booksRead.value != 0){
    console.log(booksRemaining)
    frequencyDisplayText.innerText = "You have completed the goal!";
  }else{
    frequencyDisplayText.innerText = "";
  }
}

updateGoalDate();
updateDaysLeft();
bookFrequencyCalculate();

booksRead.addEventListener('change', bookFrequencyCalculate);
booksGoal.addEventListener('change', bookFrequencyCalculate);

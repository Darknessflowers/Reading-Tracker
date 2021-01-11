let booksRead = document.querySelector('#booksRead');
let booksGoal = document.querySelector('#booksGoal');
let currentDate = Date.now();
let endOfChallenge = new Date('December 31, 2021 23:59:59').getTime();
let oneDay = 1000*60*60*24;
let daysLeft = Math.round((endOfChallenge - currentDate)/oneDay);
let daysLeftDisplay = document.querySelector('#daysLeftDisplay');
let bookFrequencyDisplay = document.querySelector('#bookFrequencyDisplay');
let frequencyDisplayText = document.querySelector('#frequencyDisplayText');

const resetFrequencyDisplayTextParagraph = () => {
    frequencyDisplayText.innerHTML = "You need to finish a book every "+
      "<span id='bookFrequencyDisplay'></span> days.";
      bookFrequencyDisplay = document.querySelector('#bookFrequencyDisplay');
}

console.log(currentDate);

function updateDaysLeft() {
  daysLeftDisplay.innerText = daysLeft;
}
function bookFrequencyCalculate() {
  let booksRemaining = parseInt(booksGoal.value - booksRead.value);
  if (booksRemaining > 0){
    resetFrequencyDisplayTextParagraph();
    let bookFrequencyNum = daysLeft / booksRemaining;
    bookFrequencyDisplay.innerText = Math.floor(bookFrequencyNum);
    console.log(booksRemaining)
  }else{
    frequencyDisplayText.innerText = "You have completed the goal!";
  }
}

updateDaysLeft();
bookFrequencyCalculate();

booksRead.addEventListener('change', bookFrequencyCalculate);
booksGoal.addEventListener('change', bookFrequencyCalculate);

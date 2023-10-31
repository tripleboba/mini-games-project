var isStarted;
var dealerCards = [];
var userCards = [];

function startGame() {
  isStarted = true;
  hideElement("startButton");
  showElement("gameStartedContainer", "game-container");
  drawCard();
}

function shuffleDeck() {
  // generate random number with
  // number cards: from 2 -> 10
  // face cards: jack: 11, queen: 12, king: 13, ace: 14
  return Math.floor(Math.random() * (14 - 2 + 1)) + 2;
}

function drawCard() {
  addCard();

  console.log(dealerCards, userCards);
  uiDisplayHelper();
}

function addCard() {
  dealerCards.push(shuffleDeck());
  userCards.push(shuffleDeck());
}

function translateDeck(cardList) {
  // translate numbers assigned for face cards to the ui logic
  // face cards: jack: 11, queen: 12, king: 13, ace: 14
}

function drawAJack() {}

/** Helper in display necessary info to the UI */
function uiDisplayHelper() {
  displayNumberOfCards("dealerCards");
  displayNumberOfCards("userCards");
}

function displayNumberOfCards(elementId) {
  document.getElementById(elementId).textContent =
    elementId === "dealerCards" ? dealerCards.length : userCards.length;
}

function endGame() {
  showElement("result", "result-section");
  disableButton("drawCardButton");
  disableButton("endButton");
}

function replayGame() {
  hideElement("result");
  reset();
  drawCard();
}

function reset() {
  dealerCards = [];
  userCards = [];
  uiDisplayHelper();
  enableButton("drawCardButton");
  enableButton("endButton");
}

function hideElement(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    element.classList.add("hidden");
  }
}

function showElement(elementId, cssClass = "") {
  var element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("hidden");
    element.classList.add(cssClass);
  }
}

function disableButton(buttonId) {
  var button = document.getElementById(buttonId);
  if (button) {
    button.disabled = true;
  }
}

function enableButton(buttonId) {
  var button = document.getElementById(buttonId);
  if (button) {
    button.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // user clicks start the game -> hide start button and show game div
  var startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGame);

  // when user clicks draw a card, both dealer and user will get a new card added to their hands
  var drawCardButton = document.getElementById("drawCardButton");
  drawCardButton.addEventListener("click", drawCard);

  // user clicks end game, show result section
  var endButton = document.getElementById("endButton");
  endButton.addEventListener("click", endGame);

  // use clicks compete again, hide result section
  var replayButton = document.getElementById("replayButton");
  replayButton.addEventListener("click", replayGame);
});

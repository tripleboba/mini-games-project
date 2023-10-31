var isStarted;
var dealerCards = [];
var userCards = [];

function startGame() {
  isStarted = true;
  hideElement("startButton");
  showElement("gameStartedContainer");
  drawCard();

  uiDisplayHelper();
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

function hideElement(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    element.style.display = "none";
  }
}

function showElement(elementId) {
  var element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // user click start the game -> hide start button and show game div
  var startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGame);

  // when user click draw a card, both dealer and user will get a new card added to their hands
  var drawCardButton = document.getElementById("drawCardButton");
  drawCardButton.addEventListener("click", drawCard);
});

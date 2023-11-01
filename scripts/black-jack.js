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
  // face cards: queen: 11, king: 12, ace: 13, jack: 14
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

  getTotalCardsValue(dealerCards);
  getTotalCardsValue(userCards);
}

function translateDeck(cardList) {
  // translate numbers assigned for face cards to the ui logic
  // face cards: queen: 11, king: 12, ace: 13, jack: 14
}

/**
 * if jack (generated random number assigned to 14) is drawn, decide to set:
 * - J value as 1 if: the rest + 11 J gonna be busted
 * - J value as 11 if: the rest + 11 J gonna win
 * - show both total for J = 1 / J = 11 if the rest + J neither bust nor win
 */
function hasJack() {}

function getTotalCardsValue(cardList) {
  return cardList.reduce(
    (total, currentCard) => total + setCardValue(currentCard),
    0
  );
}

function setCardValue(generatedNumber) {
  // number cards: from 2 -> 10
  // face cards: queen: 11, king: 12, ace: 13, jack: 14
  if (generatedNumber <= 10) {
    return generatedNumber;
  } else if (generatedNumber <= 13) {
    return 10;
  } else {
    // handle hasJack in list return 2 values
    return 0;
  }
}

/** Helper in display necessary info to the UI */
function uiDisplayHelper() {
  displayNumberOfCards();
}

function displayNumberOfCards() {
  // total number of drawn cards gonna be always the same for both dealer and user
  var totalCards = document.getElementsByClassName("totalCards");
  function setText() {
    for (var i = 0; i < totalCards.length; i++) {
      totalCards[i].textContent =
        dealerCards.length !== 1
          ? dealerCards.length + " cards"
          : dealerCards.length + " card";
    }
  }
  setText();
}

function endGame() {
  showElement("result", "result-section");
  disableButton("drawCardButton");
  disableButton("endButton");
  enableButton("replayButton");
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
  disableButton("replayButton");
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

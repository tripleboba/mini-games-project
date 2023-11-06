var isStarted;
var dealerCards = [];
var userCards = [];
var dealerPoint = 0;
var userPoint = 0;
var resultMsg = "";

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
  getGameResult();
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
  // face cards: jack: 11, queen: 12, king: 13, ace: 14
  let translated = [];
  for (card of cardList) {
    switch (card) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        translated.push(card.toString());
        break;
      case 11:
        translated.push("jack");
        break;
      case 12:
        translated.push("queen");
        break;
      case 13:
        translated.push("king");
        break;
      case 14:
        translated.push("ace");
        break;
      default:
    }
  }
  return translated;
}

function getTotalCardsValue(cardList) {
  return cardList.reduce(
    (total, currentCard) => total + setCardValue(currentCard, total),
    0
  );
}

function setCardValue(generatedNumber, cardListTotal) {
  // number cards: from 2 -> 10
  // face cards: jack: 11, queen: 12, king: 13, ace: 14
  if (generatedNumber <= 10) {
    return generatedNumber;
  } else if (generatedNumber <= 13) {
    return 10;
  } else {
    return hasAce(cardListTotal);
  }
}

/**
 * if ace (generated random number assigned to 14) is drawn, decide to set:
 * - A value as 1 if: the rest + 11 A gonna be busted
 * - A value as 11 if: the rest + 11 A gonna win
 */
function hasAce(cardListTotal) {
  return cardListTotal + 11 <= 21 ? 11 : 1;
}

function getGameResult() {
  let dealerTotal = getTotalCardsValue(dealerCards);
  let userTotal = getTotalCardsValue(userCards);

  if (
    (dealerTotal === 21 && userTotal !== 21) ||
    (userTotal > 21 && dealerTotal <= 21)
  ) {
    dealerPoint++;
    resultMsg = "You bust! Dealer wins this round!";
    endGame();
  } else if (
    (dealerTotal === 21 && userTotal === 21) ||
    (dealerTotal > 21 && userTotal > 21)
  ) {
    userPoint++;
    dealerPoint++;
    resultMsg = "Tie!";
    endGame();
  } else if (!(dealerTotal < 21 && userTotal < 21)) {
    userPoint++;
    resultMsg = "Dealer busts! You win this round!";
    endGame();
  }
}

function getGameResultEarly() {
  let dealerTotal = getTotalCardsValue(dealerCards);
  let userTotal = getTotalCardsValue(userCards);

  if (dealerTotal > userTotal) {
    dealerPoint++;
    resultMsg = "You bust! Dealer wins this round!";
  } else if (dealerTotal === userTotal) {
    userPoint++;
    dealerPoint++;
    resultMsg = "Tie!";
  } else {
    userPoint++;
    resultMsg = "Dealer busts! You win this round!";
  }
}

/** Helper in display necessary info to the UI */
function uiDisplayHelper() {
  displayNumberOfCards();
  displayTotalValue("dealerTotalValue");
  displayTotalValue("userTotalValue");
  displayDrawnCards("dealerDrawnCards");
  displayDrawnCards("userDrawnCards");
  displayPoint("dealerPoint");
  displayPoint("userPoint");
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

function displayDrawnCards(elementId) {
  document.getElementById(elementId).textContent = elementId.includes("dealer")
    ? translateDeck(dealerCards)
    : translateDeck(userCards);
}

function displayTotalValue(elementId) {
  document.getElementById(elementId).textContent = elementId.includes("dealer")
    ? getTotalCardsValue(dealerCards)
    : getTotalCardsValue(userCards);
}

function displayPoint(elementId) {
  document.getElementById(elementId).textContent = elementId.includes("dealer")
    ? dealerPoint
    : userPoint;
}

function displayGameResult() {
  document.getElementById("gameResult").textContent = resultMsg;
}

function endGame() {
  showElement("result", "result-section");
  displayGameResult();

  disableButton("drawCardButton");
  disableButton("endButton");
  enableButton("replayButton");
}

function endGameEarly() {
  showElement("result", "result-section");
  getGameResultEarly();
  displayGameResult();
  displayPoint("dealerPoint");
  displayPoint("userPoint");

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
  endButton.addEventListener("click", endGameEarly);

  // use clicks compete again, hide result section
  var replayButton = document.getElementById("replayButton");
  replayButton.addEventListener("click", replayGame);
});

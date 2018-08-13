/*
* Modal
* Modal Script gotten from W3 Schools
*/
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


/*
 * Create a list that holds all of your cards
 */

const cards = [
        `<li class="card">
            <i class="fa fa-diamond"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-paper-plane-o"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-anchor"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-bolt"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-cube"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-anchor"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-leaf"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-bicycle"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-diamond"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-bomb"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-leaf"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-bomb"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-bolt"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-bicycle"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-paper-plane-o"></i>
        </li>`,
        `<li class="card">
            <i class="fa fa-cube"></i>
        </li>`
    ];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deckDiv = document.querySelector('.deck');
shuffleCards();

// Shuffles cards on deck
function shuffleCards() {
    deckDiv.innerHTML = "";
    shuffle(cards).forEach(function (card) {
        const span = document.createElement('span');
        span.innerHTML = card;
        deckDiv.appendChild(span);
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Stars
 const firstStar = document.getElementById('first-star');
 const secondStar = document.getElementById('second-star');
 const thirdStar = document.getElementById('third-star');

 // Moves
const moves = document.querySelector('.moves');

let open = [];
let matchedCards = [];
let movesCounter = 0;
let isStarted = false;

// Timer
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
let interval = "";
let totalSeconds = 0;

// Score
const scoreRating = document.getElementById("scoreRating");
const scoreTime = document.getElementById("scoreTime");


// Function to keep track of open cards
function openCards(className) {
    if (open.length == 1) {
        open.push(className); // class name to open cards list
        incrementMove(); // increment move
        decrementStar(); // remove stars accordingly

        if (open[0] == className) {
            cardsMatch();
            cardsMatched(className);
        } else {
            removeCardsFromList(); // remove card from list
        }
    } else {
        open.push(className);
    }
}

function cardsMatch(className) {
    // Flip card and give open class
    open.forEach(function (op) {
        let classNames = op.split(" ");
        let elements = document.querySelectorAll("." + classNames[1]);
        elements.forEach(function (element) {
            element.parentElement.className = "card match";
        });
    });
    open = [];
}

function cardsMatched(className) {
    matchedCards.push(className);  
    if (matchedCards.length == (cards.length/2)) {
        gameOver();
    }
}

function removeCardsFromList() {
    open.forEach(function (op) {
        let classNames = op.split(" ");
        let elements = document.querySelectorAll("." + classNames[1]);
        elements.forEach(function(element) {
            element.classList.remove('clicked');
            element.parentElement.className = "card";
        });
    });
    open = [];
}

function incrementMove() {
    movesCounter++;
    moves.innerText = movesCounter;
}

function startTimer() {
    interval = setInterval(setTime, 1000);
    return interval;
}

// Timer function from 
// https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function stopTimer() {
    clearInterval(interval);
}

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function clearMoves() {
    movesCounter = 0;
    moves.innerText = movesCounter;
}

function decrementStar() {
    if (movesCounter > 15) {
        thirdStar.className = "fa fa-star-o";
    }

    if (movesCounter > 20) {
        secondStar.className = "fa fa-star-o";
    } 
}

function getRating() {
    let starRating = 0
    if (movesCounter <= 5) {
        starRating = 3;
    } else if (movesCounter <= 10) {
        starRating = 2;
    } else {
        starRating = 1
    }
    return starRating;
}

function clearStars() {
    secondStar.className = "fa fa-star"; 
    thirdStar.className = "fa fa-star"; 
}

function clearTimer() {
    stopTimer();
    totalSeconds = 0;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
}

function restartGame() {
    open = [];
    matchedCards = [];
    isStarted = false;
    clearMoves();
    clearStars();
    clearTimer();
    shuffleCards();
    clearTimer();
    

    let cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.classList.remove('match');
        card.firstChild.nextSibling.classList.remove('clicked');
    });
}

function gameOver() {
    isStarted = false;
    scoreRating.innerHTML = getRating();
    scoreTime.innerHTML = totalSeconds;
    stopTimer();
    clearTimer();
    modal.style.display = "block";
}

// Card click listener
function cardClickListener(event) {
    if (!isStarted) {
        isStarted = true;
        startTimer();
    }

    let i = event.target.querySelector('i'); // get clicked element
    
    if (i === null) {
        i = event.target.parentElement.querySelector('i');
    }

    if (!i.classList.contains('clicked')) {
        i.classList.add('clicked');
        if (i.parentElement.className != "card match") {
            i.parentElement.className += " open show"; // add classes to flip card
            let cardClassNames = i.className; // get class name on clicked i element
            setTimeout(function () { openCards(cardClassNames) }, 500); // Deley opening the card for half a second
        }
    }

}

const deck = document.querySelector('.deck');
deck.addEventListener('click', cardClickListener);

const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
    restartGame();
});

const playAgain = document.getElementById('playAgain');
playAgain.addEventListener('click', function(e) {
    e.preventDefault();
    restartGame();
    modal.style.display = "none";
});
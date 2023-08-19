

// dom nodes

// clone html collection into pure array
let boxes = [...document.getElementsByClassName("card")];
let section = document.querySelector("section");
let Start = document.querySelector(".Start")
let openCards = [];
let mathcedCount = 0;



// functions
function showCard(event) {
    this.classList.add("show")
    openCards.push(this)
    if (openCards.length === 2) {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            matchCards()
        } else {
            openCards[0].classList.add("unmatched")
            openCards[1].classList.add("unmatched")
            freezeAll();
            // return open cards to previous state
            setTimeout(function () {
                unmatchedCards()
            }, 2000)
        }

    }
}


function matchCards() {
    mathcedCount++;
    openCards[0].classList.add("matched");
    openCards[1].classList.add("matched");
    openCards.length = 0;

    // GAME OVER
    if (mathcedCount === 8) {
        console.log("YOU WIN");
        Start.style.display="block";
        Start.textContent="YOU WIN"
    }
}


function unmatchedCards() {
    openCards[0].classList.remove("unmatched", "show")
    openCards[1].classList.remove("unmatched", "show")
    openCards.length = 0;
    unFreezeAll();
}

function freezeAll() {
    for (const box of boxes) {
        box.classList.add("freeze")
    }
}

function unFreezeAll() {
    for (const box of boxes) {
        box.classList.remove("freeze")
    }
}


function showAllCards() {
    for (const box of boxes) {
        box.classList.add("show")
      
    }
}

function hideAllCards() {
    for (const box of boxes) {
        box.classList.remove("show")
        Start.style.display="none";
    }
}

function startGame() {
    let shuffledCards = shuffle(boxes);
    section.innerHTML = "";
    for (const card of shuffledCards) {
        section.innerHTML += card.outerHTML;
    }
    boxes = document.querySelectorAll(".card");
    for (const box of boxes) {
        box.addEventListener("click", showCard)
    }
    showAllCards();
    setTimeout(hideAllCards, 3000)
    box.classList.remove("Start")
}

function shuffle(array) {
    for (let index = 0; index < array.length; index++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        const temp = array[index];
        array[index] = array[randomIndex];
        array[randomIndex] = temp
    }

    return array
}

// events
window.addEventListener("load", startGame);
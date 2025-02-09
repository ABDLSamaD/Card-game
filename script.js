const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 30;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if(timeLeft <= 0) {
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 8 && timeLeft > 0) {
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timeLeft = maxTime;
    flips = matchedCard = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    // card.classList.add("flip")
    card.addEventListener("click", flipCard);
});



// let cards = document.querySelectorAll(".card");

// let cardOne, cardTwo;
// let matchCard = 0
// let disabledCard = false

// const flipCard = (e) =>{

//     let clickedCard = e.target
    
//     if(clickedCard !== cardOne && !disabledCard){
//         clickedCard.classList.add("flip");
//         if(!cardOne){
//             return cardOne = clickedCard;
//         }
//         cardTwo = clickedCard
//         disabledCheck = true;
//         let cardOneImg = cardOne.querySelector("img").src,
//             cardTwoImg = cardTwo.querySelector("img").src
//             matchedCards(cardOneImg, cardTwoImg);
//     }
// }

// const matchedCards = (img1, img2) =>{
//     if(img1 === img2){ //if two cards image matched
//         matchCard++
//         if(matchCard == 8){
//             setTimeout(() =>{
//                 return shuffleCards(); // return shuffle card function after 1 second
//             }, 1000)
//         }
//         // remove event listener from cardone and cardtwo
//         cardOne.removeEventListener("click", flipCard)
//         cardTwo.removeEventListener("click", flipCard)
//         cardOne = cardTwo = "";
//         return disabledCheck = false;
//     }

//     // if two cards not matched
//     setTimeout(() =>{
//         // adding shake class after 400ms
//         cardOne.classList.add("shake");
//         cardTwo.classList.add("shake");
//     },400)

//     setTimeout(() =>{
//         cardOne.classList.remove("shake", "flip");
//         cardTwo.classList.remove("shake", "flip");
//         cardOne = cardTwo = ""
//         disabledCheck = false;
//     },1200)
// }


// const shuffleCards = () =>{
//     matchCard = 0
//     cardOne = cardTwo = "";
//     disabledCard = false
//     // creating array twice an 16 times
//     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
//     arr.sort(() => Math.random() > 0.5 ? 1 : -1); // sorting an array items randomly

//     cards.forEach((card, index) =>{
//         card.classList.remove("flip")
//         let imgTag = card.querySelector("img");
//         imgTag.src = `./images/img-${arr[index]}.png`;
//         card.addEventListener("click", flipCard);
//     })
// }

// shuffleCards()

// cards.forEach(card =>{
//     // click all cards
//     card.addEventListener("click", flipCard);
// })
"use strict";

const imagesCollection = [
    "africanDog.jpg",
    "ant-hunter.jpg",
    "monkey.jpg",
    "girafe.jpg",
    "hybrid-animals.jpg",
    "lion.jpg",
    "parrot.jpg",
    "raton.jpg",
    "tiger.jpg",
];

const frontEndImages = document.querySelectorAll(".flip-card-back img");
const board = document.querySelector('.board');
const flipCards = document.querySelectorAll('.flip-card');

const playerTimer = document.querySelector('.sidebar .timer');
const playerBestScore = document.querySelector('.sidebar .best-score');
const playerClick = document.querySelector('.sidebar .clicks');

const africanDogName = imagesCollection[0].substring(0, imagesCollection[0].length - 4),
    antHunterName = imagesCollection[1].substring(0, imagesCollection[1].length - 4),
    flattenName = imagesCollection[2].substring(0, imagesCollection[2].length - 4),
    girafeName = imagesCollection[3].substring(0, imagesCollection[3].length - 4),
    hybridAnimalName = imagesCollection[4].substring(0, imagesCollection[4].length - 4),
    lionName = imagesCollection[5].substring(0, imagesCollection[5].length - 4),
    parrotName = imagesCollection[6].substring(0, imagesCollection[6].length - 4),
    ratonName = imagesCollection[7].substring(0, imagesCollection[7].length - 4),
    tigerName = imagesCollection[8].substring(0, imagesCollection[8].length - 4);

let randomNr;
let africanDogCounter = 0,
    antHunterCounter = 0,
    flattenCounter = 0,
    girafeCounter = 0,
    hybridAnimalCounter = 0,
    lionCounter = 0,
    parrotCounter = 0,
    ratonCounter = 0,
    tigerCounter = 0;


function getrandomNumber() {
    randomNr = Math.floor(Math.random() * imagesCollection.length);
}

let counter = 0;
let i;
let clickCounter = 0;

function pushIntoArr(){
    for (i = 0; i < frontEndImages.length; i++) {
        getrandomNumber();
    
        africanDogCounter = pushImage("africanDog.jpg", africanDogCounter, africanDogName);
        antHunterCounter = pushImage("ant-hunter.jpg", antHunterCounter, antHunterName);
        flattenCounter = pushImage("monkey.jpg", flattenCounter, flattenName);
        girafeCounter = pushImage("girafe.jpg", girafeCounter, girafeName);
        hybridAnimalCounter = pushImage("hybrid-animals.jpg", hybridAnimalCounter, hybridAnimalName);
        lionCounter = pushImage("lion.jpg", lionCounter, lionName);
        parrotCounter = pushImage("parrot.jpg", parrotCounter, parrotName);
        ratonCounter = pushImage("raton.jpg", ratonCounter, ratonName);
        tigerCounter = pushImage("tiger.jpg", tigerCounter, tigerName);
    
        counter++;
    }
}

pushIntoArr();

function pushImage(imageString, imageCounter, animalName) {
    if (imagesCollection[randomNr] == `${imageString}` && imageCounter < 2) {
        imageCounter++;
        document.querySelectorAll(".flip-card-back img")[counter].src += `${imagesCollection[randomNr]}`;
        flipCards[counter].classList.add(animalName);
    } else if (imagesCollection[randomNr] == `${imageString}` && imageCounter >= 2) {
        i--;
        counter--;
    }
    return imageCounter;
}

let reverseCardCounter = 0,
    cardReverse1 = null, cardReverse2 = null;

board.addEventListener('click', flipCardOnClick);

function flipCardOnClick(e) {
    const card = e.target.closest('.flip-card-inner');
    if (!card) return;
    if (card.parentNode.classList.contains('hidden')) return;

    clickCounter++;
    playerClick.innerHTML = `Click: ${clickCounter}`;

    card.style.transform = 'rotateY(180deg)';
    card.parentNode.classList.add('reverse');
    reverseCardCounter++;

    if (cardReverse1 == null) {
        cardReverse1 = card;
    } else if (cardReverse2 == null) {
        cardReverse2 = card;
    }

    setTimeout(() => {
        card.style.transform = 'rotateY(0deg)';
        card.parentNode.classList.remove('reverse');
        reverseCardCounter--;
        cardReverse1 = null;
        cardReverse2 = null;
    }, 2000);

    if (reverseCardCounter === 2) {
        board.removeEventListener('click', flipCardOnClick);

        if (cardReverse1 != null && cardReverse2 != null && cardReverse1 !== cardReverse2) {
            if (cardReverse1.parentNode.classList.contains('reverse') && cardReverse2.parentNode.classList.contains('reverse')) {
                if (cardReverse1.parentNode.classList.item(1) == cardReverse2.parentNode.classList.item(1)) {
                    setTimeout(() => {
                        cardReverse1.parentNode.classList.add('animation-scale');
                        cardReverse2.parentNode.classList.add('animation-scale');
                        cardReverse1.parentNode.classList.add('hidden');
                        cardReverse2.parentNode.classList.add('hidden');
                        cardReverse1 = null;
                        cardReverse2 = null;
                        verifyWin();
                    }, 300);
                }
            }
        }

        setTimeout(() => {
            card.style.transform = 'rotateY(0deg)';
            card.parentNode.classList.remove('reverse');
        }, 2000);

        setTimeout(() => {
            board.addEventListener('click', flipCardOnClick);
        }, 2500);
    }
}

let sec = 0, min = 0, zeroSec = 0, zeroMin;

const interval = setInterval(() => {
    if (sec === 60) {
        sec = 0;
        min += 1;
    }
    getZero(sec, min);
    playerTimer.innerHTML = `Time: ${zeroMin}${min} : ${zeroSec}${sec++}`;
}, 1000);

function getZero(seconds, minutes) {
    if (seconds < 10) {
        zeroSec = 0;
    } else {
        zeroSec = '';
    }
    if (minutes < 10) {
        zeroMin = 0;
    } else {
        zeroMin = '';
    }
}



let isEveryElementHidden;
let previousScore = 0;

const modalYouWon = document.querySelector('.modal-you-won');
const scoreModal = document.querySelector('.modal-you-won .clicks');
const playAgainModal = document.querySelector('.modal-you-won .play-again button');
const modalTime = document.querySelector('.modal-you-won .time');

const timeData = {
    min: 0,
    sec: 0
}

function verifyWin() {
    isEveryElementHidden = Array.from(flipCards).every(el => el.classList.contains('hidden'));

    if (isEveryElementHidden) {
        clearInterval(interval);

        modalYouWon.style.display = 'flex';
        scoreModal.innerHTML = `Clicks: ${clickCounter}`;
        modalTime.innerHTML = `Time: ${zeroMin}${min} : ${zeroSec}${sec}`;

        if (min > timeData.min) {
            playerBestScore.innerHTML = `${zeroMin}${min} : ${zeroSec}${sec}`;
        } else if (min == timeData.min) {
            if (sec > timeData.sec) {
                playerBestScore.innerHTML = `${zeroMin}${min} : ${zeroSec}${sec}`;
            } else {
                playerBestScore.innerHTML = `${zeroMin}${min} : ${zeroSec}${timeData.sec}`;
            }
        }

        playerBestScore.innerHTML = `${previousScore}`;
        timeData.min = min;
        timeData.sec = sec;
    }
}

playAgainModal.addEventListener('click', () => {
    africanDogCounter = 0;
    antHunterCounter = 0;
    flattenCounter = 0;
    girafeCounter = 0;
    hybridAnimalCounter = 0;
    lionCounter = 0;
    parrotCounter = 0;
    ratonCounter = 0;
    tigerCounter = 0;
    clickCounter = 0;
    counter = 0;
    min = 0;
    sec = 0;
    zeroMin = 0;
    zeroSec = 0;
    i = 0;

    flipCards.forEach((item, index) => {
        item.classList.remove(item.classList.item(1));
        item.classList.remove('hidden');
        item.classList.remove('animation-scale');
        document.querySelectorAll('.flip-card-back img')[index].src = `./images/`;
    });

    modalYouWon.style.display = 'none';
});
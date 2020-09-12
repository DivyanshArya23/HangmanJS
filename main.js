var words = ["apple", "snakes", "tom-and-jerry"];
var blanks = document.querySelector("#currentWord");
var play = document.querySelector("#playBtn");
var livesBox = document.querySelector("#lives");
var currentWord = "";
var guessed = "";
var lives = 5;

const setLives = () => {
  for (let i = 0; i < lives; i++) {
    let lifeImg = document.createElement("img");
    lifeImg.setAttribute("src", "./images/lifeHeart.png");
    lifeImg.setAttribute("height", "15px");
    livesBox.appendChild(lifeImg);
  }
};
const chooseWord = () => {
  randomindex = Math.floor(Math.random() * words.length);
  randomWord = words[randomindex];
  return randomWord;
};

const setBlanks = (para) => {
  currentWord = chooseWord().toUpperCase();
  let initial = "";
  for (let i = 0; i < currentWord.length; i++) {
    let ASCII = currentWord.charCodeAt(i);
    if (ASCII >= 65 && ASCII <= 90) {
      initial += "_ ";
    } else {
      initial += currentWord[i] + " ";
    }
  }
  guessed = initial;
  blanks.innerHTML = guessed;
  lives = 5;
  setLives();
};

const keyIsAlpha = (keyCode) => {
  return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
};

const hasWon = () => {
  if (guessed.replaceAll(" ", "") === currentWord) {
    alert("Congratulations You Won");
    return true;
  }
  return false;
};

const hasLost = () => {
  if (lives <= 0) {
    alert("Sorry, you Lost");
    return true;
  }
  return false;
};

const keyPressed = (e) => {
  if (keyIsAlpha(e.keyCode)) {
    let temp = "";
    let flag = false;
    for (let i = 0; i < guessed.length; i += 2) {
      if (guessed[i] == "_" && currentWord[i / 2] == e.key.toUpperCase()) {
        temp += currentWord[i / 2] + " ";
        flag = true;
      } else {
        temp += guessed[i] + " ";
      }
    }
    if (!flag) {
      livesBox.removeChild(livesBox.children[0]);
      lives = lives - 1;
    }
    guessed = temp;
    blanks.innerHTML = guessed;
    if (hasWon() || hasLost()) {
      setBlanks();
    }
  }
};

document.onkeypress = keyPressed;
play.onclick = setBlanks;

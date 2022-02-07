// variables para el juego
let word = "";
let fontSize = 70;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let failsCounter = 0;
let gameStarted = false;
let failLetters = "";
let writedLetters = "";
const startButton = document.querySelector("#start_button");
const addButton = document.querySelector("#add_button");
const inputNewWord = document.querySelector("#input_new_word");
const showWordsListLink = document.querySelector("#show_words_list_link");
const wordsList = document.querySelector("#words_list");
const startedMessage = document.querySelector("#started_message");
const you_are_acerted_message = document.querySelector("#you_are_acerted_message");
const you_are_wrong_message = document.querySelector("#you_are_wrong_message");
let dummyInputCreated = false;
// lista de palabras para usar en el juego
//trasformar todas las palabras en un array en mayuscula
const words = bancoDePalabras.map((word) => word.toUpperCase());

// funciones

const randomWord = () => {
  let random = Math.floor(Math.random() * words.length);
  return words[random];
};

const drawSpaces = (word) => {
 
  for (let i = 0; i < word.length; i++) {
    ctx.fillStyle = "#000033";
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(
      "_",
      i * 70 + (canvasWidth - word.length * fontSize) / 2 + 50,
      canvasHeight - 300
    );
  }
};
const start = () => {
 
  startedMessage.style.display = "inherit"
  startGame();
  word = randomWord();
  drawSpaces(word);
  drawFloor();
  gameStarted = true;
  openKeyBoard();
  let dummyInput = document.querySelector("#dummy_input").focus();
  startedMessage.classList.add("started_message_show");
  setTimeout(() => {
    startedMessage.classList.remove("started_message_show");
    startedMessage.innerHTML = "";
    startedMessage.remove();
  }
  , 1600);
  window.scrollTo(0, 120);
};

const restart = () => {
 
  window.location.reload();
};

const addNewWord = () => {
 
  let newWord = inputNewWord.value;
  words.push(newWord);
  inputNewWord.value = "";
  showWordsList();
};

const showWordsList = () => {

  wordsList.style.display = "block";
  wordsList.innerHTML = "";
  for (let i = 0; i < words.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = words[i];
    wordsList.appendChild(li);
  }
};

const inputToUppercase = (input) => {
  
  input.value = input.value.toUpperCase();
};

const createRestartButton = () => {
  
  const restartButton = document.createElement("button");
  restartButton.innerHTML = "Reiniciar";
  restartButton.classList.add("restart_button");
  restartButton.style.display = "inherit";
  restartButton.addEventListener("click", () => {
    restart();
  });
  canvas.parentNode.insertBefore(restartButton, canvas);
};

const addLetterInWritedLetters = (letter) => {

  let ammountOfLetterInWord = word
    .split("")
    .filter((el) => el === letter).length;
  let ammountOfletterInWritedLetters = writedLetters
    .split("")
    .filter((el) => el === letter).length;
  if (ammountOfLetterInWord > ammountOfletterInWritedLetters) {
    writedLetters += letter;
  }
};

const checkLetter = (letter) => {

  let correct = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter && failLetters.includes(letter) === false) {
      correct = true;
    }
  }

  
  if (window.innerWidth = 600) {

  if (correct) {
    you_are_acerted_message.style.display = "inherit";
    you_are_acerted_message.classList.add("you_are_acerted_message_show");
    setTimeout(() => {
      you_are_acerted_message.style.display = "none";
    }, 800);
  }
   else {
    you_are_wrong_message.style.display = "inherit";
    you_are_wrong_message.classList.add("you_are_wrong_message_show");
    setTimeout(() => {
      you_are_wrong_message.style.display = "none";
    }, 800);
  }
  }

  return correct;
};

const checkIfWon = () => {
 
  if (writedLetters.length === word.length) {
    return true;
  }
  return false;
};

const checkIfLost = () => {

  if (failsCounter === 9) {
    return true;
  }
};

function openKeyBoard() {
  if (!dummyInputCreated) {
    let dummyInput = document.createElement("input");
    dummyInput.setAttribute("type", "text");
    dummyInput.setAttribute("id", "dummy_input");
    dummyInput.setAttribute("style", "position: absolute; top: -2000px;");
    document.body.appendChild(dummyInput);
    dummyInput.focus();
    dummyInputCreated = true;
  }
}

function closeKeyBoard() {
  let dummyInput = document.querySelector("#dummy_input");
  dummyInput.blur();
};

function focusOnDummyInput() {
  let dummyInput = document.querySelector("#dummy_input");
  dummyInput.focus();
}


canvas.addEventListener("click", () => {
  openKeyBoard();
  let dummyInput = document.querySelector("#dummy_input").focus();
});


startButton.addEventListener("click", start);


inputNewWord.addEventListener("keyup", (e) => {
  inputToUppercase(e.target);
});


addButton.addEventListener("click", addNewWord);


showWordsListLink.addEventListener("click", showWordsList);


document.addEventListener("keyup", (e) => {
 
  let letter;
  let dummyInput = document.querySelector("#dummy_input");
  if (dummyInput) {
    letter = dummyInput.value.toUpperCase();
  }

  if (checkLetter(letter)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        hit = true;
        ctx.fillStyle = "#000";
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(
          letter,
          i * 70 + (canvasWidth - word.length * fontSize) / 2 + 50,
          canvasHeight - 300
        );
        addLetterInWritedLetters(letter);
      }
    }
  }
  dummyInput.value = "";
  drawFail(checkLetter(letter), letter);

  if (checkIfWon()) {
    drawWinMessage();
  }
  if (checkIfLost()) {
    drawLostMessage();
  }
 
  if (window.innerWidth < 600) {
    closeKeyBoard();
  };
});
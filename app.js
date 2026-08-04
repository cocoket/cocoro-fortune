const BACK_IMAGE = "images/パッケージ_こころトランプ.jpg";

const cardImage = document.getElementById("cardImage");
const cardFrame = document.getElementById("cardFrame");
const drawButton = document.getElementById("drawButton");
const statusText = document.getElementById("statusText");
const cardWord = document.getElementById("cardWord");
const cardMessage = document.getElementById("cardMessage");

let lastCardIndex = -1;
let isDrawing = false;

function getRandomCardIndex(excludeIndex = -1) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return -1;
  }

  if (cards.length === 1) {
    return 0;
  }

  let index;

  do {
    index = Math.floor(Math.random() * cards.length);
  } while (index === excludeIndex);

  return index;
}

function displayCard(card) {
  cardImage.src = card.image;
  cardImage.alt = `${card.word}のカード`;

  cardWord.textContent = `今日のキーワードは「${card.word}」`;
  cardMessage.textContent =
    "この言葉を少しだけ意識して、今日を過ごしてみましょう。";
}

function showBackCard() {
  cardImage.src = BACK_IMAGE;
  cardImage.alt = "こころトランプのカード裏面";

  statusText.textContent = "カードを引く準備ができました";
  cardWord.textContent = "今日のカードを引いてみよう";
  cardMessage.textContent =
    "カードを引いたあと、今日のキーワードが表示されます。";
}

function setDrawingState(drawing) {
  isDrawing = drawing;
  drawButton.disabled = drawing;

  if (drawing) {
    drawButton.textContent = "カードを選んでいます…";
    drawButton.classList.add("is-drawing");
  } else {
    drawButton.textContent = "もう一度引く";
    drawButton.classList.remove("is-drawing");
  }
}

function finishDrawing(finalIndex) {
  const finalCard = cards[finalIndex];

  lastCardIndex = finalIndex;

  cardFrame.classList.remove("is-shuffling");
  cardFrame.classList.add("is-revealing");

  displayCard(finalCard);

  statusText.textContent = "今日のカードはこれ！";

  window.setTimeout(() => {
    cardFrame.classList.remove("is-revealing");
    setDrawingState(false);
  }, 650);
}

function startDrawing() {
  if (isDrawing || !Array.isArray(cards) || cards.length === 0) {
    return;
  }

  setDrawingState(true);

  statusText.textContent = "だらららららららら……";
  cardWord.textContent = "カードを選んでいます";
  cardMessage.textContent = "どの言葉が出るか、お楽しみに。";

  cardFrame.classList.add("is-shuffling");

  const finalIndex = getRandomCardIndex(lastCardIndex);

  let step = 0;
  const totalSteps = 26;

  function shuffleStep() {
    if (step >= totalSteps) {
      finishDrawing(finalIndex);
      return;
    }

    const temporaryIndex = Math.floor(Math.random() * cards.length);
    const temporaryCard = cards[temporaryIndex];

    cardImage.src = temporaryCard.image;
    cardImage.alt = "カードを選んでいます";

    step += 1;

    const progress = step / totalSteps;
    const delay = 55 + Math.pow(progress, 2.4) * 230;

    window.setTimeout(shuffleStep, delay);
  }

  shuffleStep();
}

function preloadImages() {
  const imageUrls = [
    BACK_IMAGE,
    ...cards.map((card) => card.image)
  ];

  imageUrls.forEach((url) => {
    const image = new Image();
    image.src = url;
  });
}

drawButton.addEventListener("click", startDrawing);

showBackCard();
preloadImages();

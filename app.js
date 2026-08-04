const BACK_IMAGE = "images/パッケージ_こころトランプ.jpg";

const cardImage = document.getElementById("cardImage");
const cardFrame = document.getElementById("cardFrame");
const drawButton = document.getElementById("drawButton");
const statusText = document.getElementById("statusText");
const cardWord = document.getElementById("cardWord");
const cardMessage = document.getElementById("cardMessage");

let lastCardIndex = -1;
let isDrawing = false;
let shuffleTimer = null;

/* --------------------------------
   ランダムカードを選ぶ
-------------------------------- */

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

/* --------------------------------
   カードを画面に表示
-------------------------------- */

function displayCard(card) {
  cardImage.src = card.image;
  cardImage.alt = `${card.word}のカード`;

  cardWord.textContent =
    `今日のキーワードは「${card.word}」`;

  cardMessage.textContent =
    "この言葉を少しだけ意識して、今日を過ごしてみましょう。";
}

/* --------------------------------
   最初の裏面表示
-------------------------------- */

function showBackCard() {
  cardImage.src = BACK_IMAGE;
  cardImage.alt = "こころトランプのカード裏面";

  statusText.textContent =
    "カードを引く準備ができました";

  cardWord.textContent =
    "今日のカードを引いてみよう";

  cardMessage.textContent =
    "カードを引いたあと、今日のキーワードが表示されます。";

  drawButton.textContent =
    "今日のカードを引く";
}

/* --------------------------------
   ボタン状態
-------------------------------- */

function setDrawingState(drawing) {
  isDrawing = drawing;
  drawButton.disabled = drawing;

  if (drawing) {
    drawButton.textContent =
      "カードを選んでいます…";

    drawButton.classList.add("is-drawing");
  } else {
    drawButton.textContent =
      "もう一度引く";

    drawButton.classList.remove("is-drawing");
  }
}

/* --------------------------------
   ドラムロール文字
-------------------------------- */

function getDrumText(step, totalSteps) {
  const progress = step / totalSteps;

  if (progress < 0.25) {
    return "だらららららららららら……";
  }

  if (progress < 0.5) {
    return "だららららららら……";
  }

  if (progress < 0.72) {
    return "だらららら……";
  }

  if (progress < 0.87) {
    return "だらら……";
  }

  if (progress < 0.96) {
    return "だら……";
  }

  return "だ……";
}

/* --------------------------------
   シャッフル速度
-------------------------------- */

function getShuffleDelay(step, totalSteps) {
  const progress = step / totalSteps;

  /*
    最初はかなり速く、
    後半になるほど大きく減速
  */
  if (progress < 0.3) {
    return 35;
  }

  if (progress < 0.5) {
    return 50;
  }

  if (progress < 0.68) {
    return 75;
  }

  if (progress < 0.82) {
    return 115;
  }

  if (progress < 0.92) {
    return 180;
  }

  return 280;
}

/* --------------------------------
   最終カードを確定
-------------------------------- */

function finishDrawing(finalIndex) {
  const finalCard = cards[finalIndex];

  lastCardIndex = finalIndex;

  cardFrame.classList.remove("is-shuffling");

  /*
    一瞬「だん！」を見せてから
    最終カードを表示
  */
  statusText.textContent = "だん！！";

  cardWord.textContent =
    "今日のカードが決まりました";

  cardMessage.textContent =
    "あなたへの今日の言葉は……";

  window.setTimeout(() => {
    displayCard(finalCard);

    statusText.textContent =
      "今日のカードはこれ！";

    cardFrame.classList.add("is-revealing");
    cardFrame.classList.add("is-sparkling");

    window.setTimeout(() => {
      cardFrame.classList.remove("is-revealing");
    }, 850);

    window.setTimeout(() => {
      cardFrame.classList.remove("is-sparkling");
      setDrawingState(false);
    }, 1400);
  }, 500);
}

/* --------------------------------
   ドラムロール開始
-------------------------------- */

function startDrawing() {
  if (
    isDrawing ||
    !Array.isArray(cards) ||
    cards.length === 0
  ) {
    return;
  }

  setDrawingState(true);

  cardFrame.classList.remove("is-revealing");
  cardFrame.classList.remove("is-sparkling");
  cardFrame.classList.add("is-shuffling");

  cardWord.textContent =
    "カードを選んでいます";

  cardMessage.textContent =
    "どの言葉が出るか、お楽しみに。";

  const finalIndex =
    getRandomCardIndex(lastCardIndex);

  let step = 0;
  const totalSteps = 46;

  function shuffleStep() {
    if (step >= totalSteps) {
      finishDrawing(finalIndex);
      return;
    }

    const temporaryIndex =
      Math.floor(Math.random() * cards.length);

    const temporaryCard =
      cards[temporaryIndex];

    cardImage.src =
      temporaryCard.image;

    cardImage.alt =
      "カードをシャッフルしています";

    statusText.textContent =
      getDrumText(step, totalSteps);

    step += 1;

    const delay =
      getShuffleDelay(step, totalSteps);

    shuffleTimer =
      window.setTimeout(shuffleStep, delay);
  }

  shuffleStep();
}

/* --------------------------------
   画像を先読み
-------------------------------- */

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

/* --------------------------------
   初期化
-------------------------------- */

drawButton.addEventListener(
  "click",
  startDrawing
);

showBackCard();
preloadImages();

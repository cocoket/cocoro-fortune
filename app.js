const BACK_IMAGE =
  "images/パッケージ_こころトランプ.jpg";

const cardImage =
  document.getElementById("cardImage");

const cardFrame =
  document.getElementById("cardFrame");

const drawButton =
  document.getElementById("drawButton");

const statusText =
  document.getElementById("statusText");

const cardWord =
  document.getElementById("cardWord");

const cardMessage =
  document.getElementById("cardMessage");

const sparkleLayer =
  document.getElementById("sparkleLayer");

let lastCardIndex = -1;
let isDrawing = false;
let shuffleTimer = null;

/* ランダムカードを選ぶ */

function getRandomCardIndex(excludeIndex = -1) {

  if (!Array.isArray(cards) || cards.length === 0) {
    return -1;
  }

  // 一番最後がシークレットカード
  const secretIndex = cards.length - 1;

  // 1000回に1回
  if (Math.random() < 0.001) {
    return secretIndex;
  }

  let index;

  do {
    // シークレット以外から選ぶ
    index = Math.floor(
      Math.random() * (cards.length - 1)
    );

  } while (index === excludeIndex);

  return index;

}  
  if (!Array.isArray(cards) || cards.length === 0) {
    return -1;
  }

  if (cards.length === 1) {
    return 0;
  }

  let index;

  do {
    index =
      Math.floor(Math.random() * cards.length);
  } while (index === excludeIndex);

  return index;
}

/* カードを表示 */

function displayCard(card) {
  cardImage.src = card.image;
  cardImage.alt = card.word + "のカード";

  if (card.suit === "secret") {
    cardWord.textContent =
      "✨ シークレットカードが現れました！ ✨";

    cardMessage.textContent =
      card.message ||
      "今日のあなたに必要な言葉は、あなたの中にあるよ。";

    return;
  }

  cardWord.textContent =
    "今日のキーワードは「" +
    card.word +
    "」";

  cardMessage.textContent =
    card.message ||
    "この言葉を少しだけ意識して、今日を過ごしてみましょう。";
}

/* 初期画面 */

function showBackCard() {
  cardImage.src = BACK_IMAGE;
  cardImage.alt =
    "こころトランプのカード裏面";

  statusText.textContent =
    "カードを引く準備ができました";

  cardWord.textContent =
    "今日のカードを引いてみよう";

  cardMessage.textContent =
    "カードを引いたあと、今日のキーワードが表示されます。";

  drawButton.textContent =
    "今日のカードを引く";
}

/* ボタンの状態 */

function setDrawingState(drawing) {
  isDrawing = drawing;
  drawButton.disabled = drawing;

  if (drawing) {
    drawButton.textContent =
      "カードを選んでいます…";

    drawButton.classList.add(
      "is-drawing"
    );
  } else {
    drawButton.textContent =
      "もう一度引く";

    drawButton.classList.remove(
      "is-drawing"
    );
  }
}

/* ドラムロール文字 */

function getDrumText(step, totalSteps) {
  const progress =
    step / totalSteps;

  if (progress < 0.23) {
    return "だららららららららららら……";
  }

  if (progress < 0.45) {
    return "だららららららららら……";
  }

  if (progress < 0.64) {
    return "だらららららら……";
  }

  if (progress < 0.79) {
    return "だらららら……";
  }

  if (progress < 0.9) {
    return "だらら……";
  }

  if (progress < 0.97) {
    return "だら……";
  }

  return "だ……";
}

/* 徐々に遅くする */

function getShuffleDelay(step, totalSteps) {
  const progress =
    step / totalSteps;

  if (progress < 0.28) {
    return 32;
  }

  if (progress < 0.48) {
    return 45;
  }

  if (progress < 0.65) {
    return 68;
  }

  if (progress < 0.79) {
    return 105;
  }

  if (progress < 0.9) {
    return 165;
  }

  if (progress < 0.96) {
    return 235;
  }

  return 330;
}

/* キラキラを表示 */

function playSparkles() {
  if (!sparkleLayer) {
    return;
  }

  sparkleLayer.innerHTML = "";

  const sparkles = [
    {
      symbol: "✨",
      className: "sparkle sparkle-1"
    },
    {
      symbol: "✨",
      className: "sparkle sparkle-2"
    },
    {
      symbol: "✦",
      className: "sparkle sparkle-3"
    },
    {
      symbol: "✨",
      className: "sparkle sparkle-4"
    }
  ];

  sparkles.forEach(function (item) {
    const sparkle =
      document.createElement("span");

    sparkle.className =
      item.className;

    sparkle.textContent =
      item.symbol;

    sparkleLayer.appendChild(
      sparkle
    );
  });

  sparkleLayer.classList.remove(
    "show-sparkles"
  );

  void sparkleLayer.offsetWidth;

  sparkleLayer.classList.add(
    "show-sparkles"
  );

  window.setTimeout(function () {
    sparkleLayer.classList.remove(
      "show-sparkles"
    );

    sparkleLayer.innerHTML = "";
  }, 1500);
}

/* 最終カードを確定 */

function finishDrawing(finalIndex) {
  const finalCard =
    cards[finalIndex];

  lastCardIndex =
    finalIndex;

  cardFrame.classList.remove(
    "is-shuffling"
  );

  statusText.textContent =
    "だん！！";

  cardWord.textContent =
    "今日のカードが決まりました";

  cardMessage.textContent =
    "あなたへの今日の言葉は……";

  window.setTimeout(function () {
    displayCard(finalCard);

    statusText.textContent =
      "今日のカードはこれ！";

    cardFrame.classList.add(
      "is-revealing"
    );

    playSparkles();

    window.setTimeout(function () {
      cardFrame.classList.remove(
        "is-revealing"
      );
    }, 850);

    window.setTimeout(function () {
      setDrawingState(false);
    }, 1450);

  }, 520);
}

/* 占いスタート */

function startDrawing() {
  if (
    isDrawing ||
    !Array.isArray(cards) ||
    cards.length === 0
  ) {
    return;
  }

  if (shuffleTimer) {
    window.clearTimeout(
      shuffleTimer
    );
  }

  setDrawingState(true);

  cardFrame.classList.remove(
    "is-revealing"
  );

  if (sparkleLayer) {
    sparkleLayer.innerHTML = "";

    sparkleLayer.classList.remove(
      "show-sparkles"
    );
  }

  cardFrame.classList.add(
    "is-shuffling"
  );

  cardWord.textContent =
    "カードを選んでいます";

  cardMessage.textContent =
    "どの言葉が出るか、お楽しみに。";

  const finalIndex =
    getRandomCardIndex(
      lastCardIndex
    );

  let step = 0;
  const totalSteps = 48;

  function shuffleStep() {
    if (step >= totalSteps) {
      finishDrawing(finalIndex);
      return;
    }

    const temporaryIndex =
      Math.floor(
        Math.random() *
        cards.length
      );

    const temporaryCard =
      cards[temporaryIndex];

    cardImage.src =
      temporaryCard.image;

    cardImage.alt =
      "カードをシャッフルしています";

    statusText.textContent =
      getDrumText(
        step,
        totalSteps
      );

    step += 1;

    const delay =
      getShuffleDelay(
        step,
        totalSteps
      );

    shuffleTimer =
      window.setTimeout(
        shuffleStep,
        delay
      );
  }

  shuffleStep();
}

/* 画像を先読み */

function preloadImages() {
  const imageUrls = [
    BACK_IMAGE,
    ...cards.map(function (card) {
      return card.image;
    })
  ];

  imageUrls.forEach(function (url) {
    const image =
      new Image();

    image.src = url;
  });
}

/* 初期化 */

drawButton.addEventListener(
  "click",
  startDrawing
);

showBackCard();
preloadImages();

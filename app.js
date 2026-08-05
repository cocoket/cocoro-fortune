/* ========================================
   今日のこころ占い app.js
======================================== */

/*
  テスト中は true にすると毎回シークレットが出ます。
  動作確認後は false に戻してください。
*/
const TEST_SECRET = true;

/* 0.001 = 約1000回に1回 */
const SECRET_PROBABILITY = 0.001;

const BACK_IMAGE =
  "images/パッケージ_こころトランプ.jpg";

const cardImage = document.getElementById("cardImage");
const cardFrame = document.getElementById("cardFrame");
const drawButton = document.getElementById("drawButton");
const statusText = document.getElementById("statusText");
const cardWord = document.getElementById("cardWord");
const cardMessage = document.getElementById("cardMessage");
const sparkleLayer = document.getElementById("sparkleLayer");
const fortunePanel = document.querySelector(".fortune-panel");

let lastCardIndex = -1;
let isDrawing = false;
let shuffleTimer = null;

function getSecretCardIndex() {
  return cards.findIndex(function (card) {
    return card.suit === "secret";
  });
}

function getNormalCardIndexes() {
  return cards
    .map(function (card, index) {
      return { card: card, index: index };
    })
    .filter(function (item) {
      return item.card.suit !== "secret";
    })
    .map(function (item) {
      return item.index;
    });
}

function getRandomCardIndex(excludeIndex = -1) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return -1;
  }

  const secretIndex = getSecretCardIndex();

  if (TEST_SECRET && secretIndex !== -1) {
    return secretIndex;
  }

  if (
    !TEST_SECRET &&
    secretIndex !== -1 &&
    Math.random() < SECRET_PROBABILITY
  ) {
    return secretIndex;
  }

  const normalCardIndexes = getNormalCardIndexes();

  if (normalCardIndexes.length === 0) {
    return -1;
  }

  if (normalCardIndexes.length === 1) {
    return normalCardIndexes[0];
  }

  let selectedIndex;

  do {
    selectedIndex =
      normalCardIndexes[
        Math.floor(Math.random() * normalCardIndexes.length)
      ];
  } while (selectedIndex === excludeIndex);

  return selectedIndex;
}

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
    "今日のキーワードは「" + card.word + "」";

  cardMessage.textContent =
    card.message ||
    "この言葉を少しだけ意識して、今日を過ごしてみましょう。";
}

function showBackCard() {
  cardImage.src = BACK_IMAGE;
  cardImage.alt = "こころトランプのカード裏面";

  statusText.textContent = "カードを引く準備ができました";
  cardWord.textContent = "今日のカードを引いてみよう";
  cardMessage.textContent =
    "カードを引いたあと、今日のキーワードが表示されます。";

  drawButton.textContent = "今日のカードを引く";
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

function getDrumText(step, totalSteps) {
  const progress = step / totalSteps;

  if (progress < 0.23) return "だららららららららららら……";
  if (progress < 0.45) return "だららららららららら……";
  if (progress < 0.64) return "だらららららら……";
  if (progress < 0.79) return "だらららら……";
  if (progress < 0.9) return "だらら……";
  if (progress < 0.97) return "だら……";

  return "だ……";
}

function getShuffleDelay(step, totalSteps) {
  const progress = step / totalSteps;

  if (progress < 0.28) return 32;
  if (progress < 0.48) return 45;
  if (progress < 0.65) return 68;
  if (progress < 0.79) return 105;
  if (progress < 0.9) return 165;
  if (progress < 0.96) return 235;

  return 330;
}

function playSparkles(isSecret) {
  if (!sparkleLayer) {
    return;
  }

  sparkleLayer.innerHTML = "";

  const normalSparkles = [
    { symbol: "✨", className: "sparkle sparkle-1" },
    { symbol: "✨", className: "sparkle sparkle-2" },
    { symbol: "✦", className: "sparkle sparkle-3" },
    { symbol: "✨", className: "sparkle sparkle-4" }
  ];

  const secretSparkles = [
    { symbol: "✨", className: "sparkle sparkle-1" },
    { symbol: "🌟", className: "sparkle sparkle-2" },
    { symbol: "✦", className: "sparkle sparkle-3" },
    { symbol: "✨", className: "sparkle sparkle-4" },
    { symbol: "⭐", className: "sparkle sparkle-5" },
    { symbol: "✨", className: "sparkle sparkle-6" }
  ];

  const sparkleItems = isSecret ? secretSparkles : normalSparkles;

  sparkleItems.forEach(function (item) {
    const sparkle = document.createElement("span");
    sparkle.className = item.className;
    sparkle.textContent = item.symbol;
    sparkleLayer.appendChild(sparkle);
  });

  sparkleLayer.classList.remove("show-sparkles");
  void sparkleLayer.offsetWidth;
  sparkleLayer.classList.add("show-sparkles");

  window.setTimeout(function () {
    sparkleLayer.classList.remove("show-sparkles");
    sparkleLayer.innerHTML = "";
  }, isSecret ? 2400 : 1500);
}

function finishDrawing(finalIndex) {
  const finalCard = cards[finalIndex];

  if (!finalCard) {
    statusText.textContent = "カードを表示できませんでした";
    cardFrame.classList.remove("is-shuffling");
    setDrawingState(false);
    return;
  }

  const isSecret = finalCard.suit === "secret";
  lastCardIndex = finalIndex;

  cardFrame.classList.remove("is-shuffling");

  statusText.textContent = isSecret ? "ジャーン！！" : "だん！！";
  cardWord.textContent = isSecret
    ? "特別なカードが現れました"
    : "今日のカードが決まりました";
  cardMessage.textContent = isSecret
    ? "これは、とてもめずらしいシークレットカードです。"
    : "あなたへの今日の言葉は……";

  window.setTimeout(function () {
    displayCard(finalCard);

    statusText.textContent = isSecret
      ? "🎉✨ シークレット！！ ✨🎉"
      : "今日のカードはこれ！";

    cardFrame.classList.add("is-revealing");

    if (isSecret) {
      cardFrame.classList.add("secret-card");

      if (fortunePanel) {
        fortunePanel.classList.add("secret-mode");
      }
    }

    playSparkles(isSecret);

    window.setTimeout(function () {
      cardFrame.classList.remove("is-revealing");
    }, 850);

    window.setTimeout(function () {
      cardFrame.classList.remove("secret-card");

      if (fortunePanel) {
        fortunePanel.classList.remove("secret-mode");
      }

      setDrawingState(false);
    }, isSecret ? 2400 : 1450);
  }, isSecret ? 700 : 520);
}

function startDrawing() {
  if (
    isDrawing ||
    !Array.isArray(cards) ||
    cards.length === 0
  ) {
    return;
  }

  if (shuffleTimer) {
    window.clearTimeout(shuffleTimer);
  }

  setDrawingState(true);

  cardFrame.classList.remove("is-revealing");
  cardFrame.classList.remove("secret-card");

  if (fortunePanel) {
    fortunePanel.classList.remove("secret-mode");
  }

  if (sparkleLayer) {
    sparkleLayer.innerHTML = "";
    sparkleLayer.classList.remove("show-sparkles");
  }

  cardFrame.classList.add("is-shuffling");

  cardWord.textContent = "カードを選んでいます";
  cardMessage.textContent = "どの言葉が出るか、お楽しみに。";

  const finalIndex = getRandomCardIndex(lastCardIndex);

  if (finalIndex === -1) {
    statusText.textContent = "カードを読み込めませんでした";
    cardFrame.classList.remove("is-shuffling");
    setDrawingState(false);
    return;
  }

  const normalCards = cards.filter(function (card) {
    return card.suit !== "secret";
  });

  if (normalCards.length === 0) {
    statusText.textContent = "通常カードが見つかりませんでした";
    cardFrame.classList.remove("is-shuffling");
    setDrawingState(false);
    return;
  }

  let step = 0;
  const totalSteps = 48;

  function shuffleStep() {
    if (step >= totalSteps) {
      finishDrawing(finalIndex);
      return;
    }

    const temporaryCard =
      normalCards[
        Math.floor(Math.random() * normalCards.length)
      ];

    cardImage.src = temporaryCard.image;
    cardImage.alt = "カードをシャッフルしています";

    statusText.textContent = getDrumText(step, totalSteps);

    step += 1;

    shuffleTimer = window.setTimeout(
      shuffleStep,
      getShuffleDelay(step, totalSteps)
    );
  }

  shuffleStep();
}

function preloadImages() {
  const imageUrls = [
    BACK_IMAGE,
    ...cards.map(function (card) {
      return card.image;
    })
  ];

  imageUrls.forEach(function (url) {
    const image = new Image();
    image.src = url;
  });
}

if (!drawButton) {
  throw new Error("drawButton が見つかりません。index.html を確認してください。");
}

drawButton.addEventListener("click", startDrawing);

showBackCard();
preloadImages();

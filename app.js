/* ========================================
   今日のこころ占い app.js
======================================== */

/*
  シークレットのテスト設定

  true  ：必ずシークレットが出る
  false ：本番確率で抽選する
*/
const TEST_SECRET = true;

/*
  本番時のシークレット出現確率
  0.001 = 0.1％、およそ1000回に1回
*/
const SECRET_PROBABILITY = 0.001;

/* カード裏面画像 */
const BACK_IMAGE =
  "images/パッケージ_こころトランプ.jpg";

/* 画面の要素 */
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

/* 状態管理 */
let lastCardIndex = -1;
let isDrawing = false;
let shuffleTimer = null;


/* ========================================
   シークレットカードを探す
======================================== */

function getSecretCardIndex() {
  return cards.findIndex(function (card) {
    return card.suit === "secret";
  });
}


/* ========================================
   通常カードの番号一覧を作る
======================================== */

function getNormalCardIndexes() {
  return cards
    .map(function (card, index) {
      return {
        card: card,
        index: index
      };
    })
    .filter(function (item) {
      return item.card.suit !== "secret";
    })
    .map(function (item) {
      return item.index;
    });
}


/* ========================================
   最終カードを抽選する
======================================== */

function getRandomCardIndex(excludeIndex = -1) {
  if (!Array.isArray(cards) || cards.length === 0) {
    return -1;
  }

  const secretIndex =
    getSecretCardIndex();

  /*
    テスト中は必ずシークレット
  */
  if (
    TEST_SECRET &&
    secretIndex !== -1
  ) {
    return secretIndex;
  }

  /*
    本番時のシークレット抽選
  */
  if (
    !TEST_SECRET &&
    secretIndex !== -1 &&
    Math.random() < SECRET_PROBABILITY
  ) {
    return secretIndex;
  }

  /*
    通常52枚から選ぶ
  */
  const normalCardIndexes =
    getNormalCardIndexes();

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
        Math.floor(
          Math.random() *
          normalCardIndexes.length
        )
      ];
  } while (
    selectedIndex === excludeIndex
  );

  return selectedIndex;
}


/* ========================================
   カードを画面へ表示する
======================================== */

function displayCard(card) {
  cardImage.src = card.image;
  cardImage.alt =
    card.word + "のカード";

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


/* ========================================
   最初の画面を表示する
======================================== */

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


/* ========================================
   ボタンの状態を切り替える
======================================== */

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


/* ========================================
   ドラムロール文字
======================================== */

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

  if (progress < 0.90) {
    return "だらら……";
  }

  if (progress < 0.97) {
    return "だら……";
  }

  return "だ……";
}


/* ========================================
   シャッフルを徐々に遅くする
======================================== */

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

  if (progress < 0.90) {
    return 165;
  }

  if (progress < 0.96) {
    return 235;
  }

  return 330;
}


/* ========================================
   キラキラを作る
======================================== */

function playSparkles(isSecret) {
  if (!sparkleLayer) {
    return;
  }

  sparkleLayer.innerHTML = "";

  const normalSparkles = [
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

  const secretSparkles = [
    {
      symbol: "✨",
      className: "sparkle sparkle-1"
    },
    {
      symbol: "🌟",
      className: "sparkle sparkle-2"
    },
    {
      symbol: "✦",
      className: "sparkle sparkle-3"
    },
    {
      symbol: "✨",
      className: "sparkle sparkle-4"
    },
    {
      symbol: "⭐",
      className: "sparkle sparkle-5"
    },
    {
      symbol: "✨",
      className: "sparkle sparkle-6"
    }
  ];

  const sparkleItems =
    isSecret
      ? secretSparkles
      : normalSparkles;

  sparkleItems.forEach(function (item) {
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

  /*
    アニメーションを毎回最初から再生する
  */
  void sparkleLayer.offsetWidth;

  sparkleLayer.classList.add(
    "show-sparkles"
  );

  window.setTimeout(function () {
    sparkleLayer.classList.remove(
      "show-sparkles"
    );

    sparkleLayer.innerHTML = "";
  }, isSecret ? 2200 : 1500);
}


/* ========================================
   最終カードを表示する
======================================== */

function finishDrawing(finalIndex) {
  const finalCard =
    cards[finalIndex];

  if (!finalCard) {
    statusText.textContent =
      "カードを表示できませんでした";

    setDrawingState(false);
    return;
  }

  const isSecret =
    finalCard.suit === "secret";

  lastCardIndex =
    finalIndex;

  cardFrame.classList.remove(
    "is-shuffling"
  );

  /*
    最後の決定音を文字で表現
  */
  statusText.textContent =
    isSecret
      ? "ジャーン！！"
      : "だん！！";

  cardWord.textContent =
    isSecret
      ? "特別なカードが現れました"
      : "今日のカードが決まりました";

  cardMessage.textContent =
    isSecret
      ? "これは、とてもめずらしいシークレットカードです。"
      : "あなたへの今日の言葉は……";

  window.setTimeout(function () {
    displayCard(finalCard);

    statusText.textContent =
      isSecret
        ? "🎉✨ シークレット！！ ✨🎉"
        : "今日のカードはこれ！";

    cardFrame.classList.add(
      "is-revealing"
    );

    if (isSecret) {
      cardFrame.classList.add(
        "secret-card"
      );
    }

    playSparkles(isSecret);

    /*
      通常のカード確定アニメーションを解除
    */
    window.setTimeout(function () {
      cardFrame.classList.remove(
        "is-revealing"
      );
    }, 850);

    /*
      シークレット専用演出を解除
    */
    window.setTimeout(function () {
      cardFrame.classList.remove(
        "secret-card"
      );

      setDrawingState(false);
    }, isSecret ? 2200 : 1450);

  }, isSecret ? 700 : 520);
}


/* ========================================
   占いを開始する
======================================== */

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

  cardFrame.classList.remove(
    "secret-card"
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

  if (finalIndex === -1) {
    statusText.textContent =
      "カードを読み込めませんでした";

    cardFrame.classList.remove(
      "is-shuffling"
    );

    setDrawingState(false);
    return;
  }

  /*
    シャッフル中には
    シークレット画像を見せない
  */
  const normalCards =
    cards.filter(function (card) {
      return card.suit !== "secret";
    });

  if (normalCards.length === 0) {
    statusText.textContent =
      "通常カードが見つかりませんでした";

    cardFrame.classList.remove(
      "is-shuffling"
    );

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
        Math.floor(
          Math.random() *
          normalCards.length
        )
      ];

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


/* ========================================
   画像を先読みする
======================================== */

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


/* ========================================
   初期化
======================================== */

drawButton.addEventListener(
  "click",
  startDrawing
);

showBackCard();
preloadImages();

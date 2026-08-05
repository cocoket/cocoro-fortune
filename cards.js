const cards = [
  // ハート
  { suit: "heart", rank: "A", word: "共感", image: "images/ハートA_共感.jpg" },
  { suit: "heart", rank: "2", word: "素直", image: "images/ハート2_素直.jpg" },
  { suit: "heart", rank: "3", word: "感謝", image: "images/ハート3_感謝.jpg" },
  { suit: "heart", rank: "4", word: "思いやり", image: "images/ハート4_思いやり.jpg" },
  { suit: "heart", rank: "5", word: "温もり", image: "images/ハート5_温もり.jpg" },
  { suit: "heart", rank: "6", word: "尊重", image: "images/ハート6_尊重.jpg" },
  { suit: "heart", rank: "7", word: "安心", image: "images/ハート7_安心.jpg" },
  { suit: "heart", rank: "8", word: "友情", image: "images/ハート8_友情.jpg" },
  { suit: "heart", rank: "9", word: "愛", image: "images/ハート9_愛.jpg" },
  { suit: "heart", rank: "10", word: "居場所", image: "images/ハート10_居場所.jpg" },
  { suit: "heart", rank: "J", word: "対話", image: "images/ハートJ_対話.jpg" },
  { suit: "heart", rank: "Q", word: "信頼", image: "images/ハートQ_信頼.jpg" },
  { suit: "heart", rank: "K", word: "絆", image: "images/ハートK_絆.jpg" },

  // クラブ
  { suit: "club", rank: "A", word: "憧れ", image: "images/クラブA_憧れ.jpg" },
  { suit: "club", rank: "2", word: "経験", image: "images/クラブ2_経験.jpg" },
  { suit: "club", rank: "3", word: "勇気", image: "images/クラブ3_勇気.jpg" },
  { suit: "club", rank: "4", word: "変化", image: "images/クラブ4_変化.jpg" },
  { suit: "club", rank: "5", word: "自己肯定感", image: "images/クラブ5_自己肯定感.jpg" },
  { suit: "club", rank: "6", word: "主体性", image: "images/クラブ6_主体性.jpg" },
  { suit: "club", rank: "7", word: "創造", image: "images/クラブ7_創造.jpg" },
  { suit: "club", rank: "8", word: "継続", image: "images/クラブ8_継続.jpg" },
  { suit: "club", rank: "9", word: "健康", image: "images/クラブ9_健康.jpg" },
  { suit: "club", rank: "10", word: "未来", image: "images/クラブ10_未来.jpg" },
  { suit: "club", rank: "J", word: "成長", image: "images/クラブJ_成長.jpg" },
  { suit: "club", rank: "Q", word: "夢", image: "images/クラブQ_夢.jpg" },
  { suit: "club", rank: "K", word: "情熱", image: "images/クラブK_情熱.jpg" },

  // ダイヤ
  { suit: "diamond", rank: "A", word: "遊び", image: "images/ダイヤA_遊び.jpg" },
  { suit: "diamond", rank: "2", word: "冒険", image: "images/ダイヤ2_冒険.jpg" },
  { suit: "diamond", rank: "3", word: "楽しむ", image: "images/ダイヤ3_楽しむ.jpg" },
  { suit: "diamond", rank: "4", word: "好奇心", image: "images/ダイヤ4_好奇心.jpg" },
  { suit: "diamond", rank: "5", word: "直観", image: "images/ダイヤ5_直観.jpg" },
  { suit: "diamond", rank: "6", word: "推し", image: "images/ダイヤ6_推し.jpg" },
  { suit: "diamond", rank: "7", word: "選択", image: "images/ダイヤ7_選択.jpg" },
  { suit: "diamond", rank: "8", word: "旅行", image: "images/ダイヤ8_旅行.jpg" },
  { suit: "diamond", rank: "9", word: "休息", image: "images/ダイヤ9_休息.jpg" },
  { suit: "diamond", rank: "10", word: "時間", image: "images/ダイヤ10_時間.jpg" },
  { suit: "diamond", rank: "J", word: "ユーモア", image: "images/ダイヤJ_ユーモア.jpg" },
  { suit: "diamond", rank: "Q", word: "財産", image: "images/ダイヤQ_財産.jpg" },
  { suit: "diamond", rank: "K", word: "美", image: "images/ダイヤK_美.jpg" },

  // スペード
  { suit: "spade", rank: "A", word: "誠実", image: "images/スペードA_誠実.jpg" },
  { suit: "spade", rank: "2", word: "正義", image: "images/スペード2_正義.jpg" },
  { suit: "spade", rank: "3", word: "自由", image: "images/スペード3_自由.jpg" },
  { suit: "spade", rank: "4", word: "平和", image: "images/スペード4_平和.jpg" },
  { suit: "spade", rank: "5", word: "効率", image: "images/スペード5_効率.jpg" },
  { suit: "spade", rank: "6", word: "決断", image: "images/スペード6_決断.jpg" },
  { suit: "spade", rank: "7", word: "真理", image: "images/スペード7_真理.jpg" },
  { suit: "spade", rank: "8", word: "常識", image: "images/スペード8_常識.jpg" },
  { suit: "spade", rank: "9", word: "革新", image: "images/スペード9_革新.jpg" },
  { suit: "spade", rank: "10", word: "責任", image: "images/スペード10_責任.jpg" },
  { suit: "spade", rank: "J", word: "貢献", image: "images/スペードJ_貢献.jpg" },
  { suit: "spade", rank: "Q", word: "多様性", image: "images/スペードQ_多様性.jpg" },
  { suit: "spade", rank: "K", word: "謙虚", image: "images/スペードK_謙虚.jpg" },

  // シークレット
  {
    suit: "secret",
    rank: "SECRET",
    word: "シークレット",
    image: "images/シークレット_こころジョーカー.jpg",
    message: "今日のあなたに必要な言葉は、あなたの中にあるよ。"
  }
];

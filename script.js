'use strict'


//問題
const meat = [{name: "ザブトン",price: 500,judg: "zabuton",imgs: "meat1"},
              {name: "牛タン",price: 500,judg: "gyuutan",imgs: "Tan"},
              {name: "ハラミ",price: 500,judg: "harami",imgs: "meat2"},
              {name: "カルビ",price: 500,judg: "karubi",imgs: "meat3"},
              {name: "牛ヒレ",price: 500,judg: "gyuuhire",imgs: "meat4"},
              {name: "サーロイン",price: 500,judg: "sa-roin",imgs: "meat1"},
              {name: "シャトーブリアン",price: 500,judg: "syato-burian",imgs: "meat6"},
              {name: "ミスジ",price: 500,judg: "misuji",imgs: "meat2"},
              {name: "牛肩ロース",price: 500,judg: "gyuukataro-su",imgs: "meat3"},
              {name: "イチボ",price: 500,judg: "itibo",imgs: "meat4"},
              {name: "サガリ",price: 500,judg: "sagari",imgs: "meat5"},
              {name: "シマチョウ",price: 500,judg: "simatyou",imgs: "meat1"},
              {name: "カイノミ",price: 500,judg: "kainomi",imgs: "meat2"},
              {name: "トモサンカク",price: 500,judg: "tomosankaku",imgs: "meat3"},
              {name: "ミノ",price: 500,judg: "mino",imgs: "meat4"},
              {name: "牛ハツ",price: 500,judg: "gyuuhatu",imgs: "meat1"},
              {name: "ランプ",price: 500,judg: "ranpu",imgs: "meat2"},
              {name: "マルチョウ",price: 500,judg: "maruchou",imgs: "meat3"},
              {name: "牛レバー",price: 500,judg: "gyuureba-",imgs: "meat4"},
              {name: "リブロース",price: 500,judg: "riburo-su",imgs: "meat1"},
              {name: "センマイ",price: 500,judg: "senmai",imgs: "meat2"},
              {name: "牛カシラ",price: 500,judg: "gyuukasira",imgs: "meat3"},
              {name: "牛フォアグラ",price: 500,judg: "gyuufoagura",imgs: "meat5"},
              {name: "スネ",price: 500,judg: "sune",imgs: "meat1"},
              {name: "テール",price: 500,judg: "te-ru",imgs: "meat2"},
              {name: "ピーマン",price: 500,judg: "pi-man",imgs: "GreenPepper"},
              {name: "玉ねぎ",price: 500,judg: "tamanegi",imgs: "Onion"},
              {name: "焼きエビ",price: 500,judg: "yakiebi",imgs: "Shrimp"}
]
//html要素を取得する
const title = document.querySelector(".title");
const img1 = document.querySelector(".img1");
const type1 = document.querySelector(".type1");
const type2 = document.querySelector(".type2");
const beepSound = document.getElementById("beep-sound");
const correctSound = document.getElementById("correct-sound");
const  grilleSound = document.getElementById("meat-sound");
const timeUpSound = document.getElementById("time-up");
const vol = document.querySelector(".vol");
const unVol = document.querySelector(".unVol");
const metaImg = document.querySelector(".meat-img");
const timerText = document.querySelector(".timer");
const correctTypeStr = document.querySelector(".correct-type");
const missTypeStr = document.querySelector(".miss-type");
const wps = document.querySelector(".wps");
const resultBackground = document.querySelector(".result");
const resultText = document.querySelector(".text");


//配列・変数の用意
let judgment = "";
let judgmentArr = [];
let judgmentSpan;
let num = 0;
let intervalStop;
let missType = 0;
let correctType = 0;
let count;

//初期化
correctTypeStr.style.visibility = "hidden";
missTypeStr.style.visibility = "hidden";
wps.style.visibility = "hidden";
resultBackground.style.visibility = "hidden";
resultText.style.visibility = "hidden";


//画像処理
let img = [];
for (const key in meat) {
  img.push(`img/${meat[key]["imgs"]}.png`)    //問題の中のimgsと紐づけた画像　問題と同じ順番で配列に入れる
}


//問題を表示させる
function questions(type) {
  //初期化
  judgment = "";
  judgmentArr = [];
  num = 0;
  let random = Math.floor(Math.random() * meat.length); //問題数に応じてランダムな数字を出力する
  type.textContent = meat[random]["name"];              //htmlに表示させる(日本語)
  judgment = (meat[random]["judg"]);                    //judgmentにローマ字表記の文字を入れる

  //問題に紐づけた画像を表示させる
  metaImg.src=img[random];
  switch (img[random]) {                                 //switch文で画像ごとにstyleを変更する
    case "img/meat1.png" :
      metaImg.style.width = "8%";
      metaImg.style.left = "47%";
      metaImg.style.bottom = "48%";
      metaImg.style.rotate = "30deg";
    break;
    case "img/Tan.png" :
      metaImg.style.width = "13%";
      metaImg.style.left = "44%";
      metaImg.style.bottom = "52%";
      metaImg.style.rotate = "-20deg";
    break;
    case "img/meat2.png" :
      metaImg.style.width = "8%";
      metaImg.style.left = "47%";
      metaImg.style.bottom = "48%";
      metaImg.style.rotate = "-20deg";
    break;
    case "img/meat3.png" :
      metaImg.style.width = "8%";
      metaImg.style.left = "47%";
      metaImg.style.bottom = "48%";
      metaImg.style.rotate = "80deg";
    break;
    case "img/meat4.png" :
      metaImg.style.width = "8%";
      metaImg.style.left = "47%";
      metaImg.style.bottom = "50%";
      metaImg.style.rotate = "30deg";
    break;
    case "img/meat5.png" :
      metaImg.style.width = "17%";
      metaImg.style.left = "42%";
      metaImg.style.bottom = "55%";
      metaImg.style.rotate = "-20deg";
    break;
    case "img/meat6.png" :
      metaImg.style.width = "13%";
      metaImg.style.left = "44%";
      metaImg.style.bottom = "55%";
      metaImg.style.rotate = "20deg";
    break;
    case "img/GreenPepper.png" :
      metaImg.style.width = "9%";
      metaImg.style.left = "45%";
      metaImg.style.bottom = "48%";
      metaImg.style.rotate = "20deg";
    break;
    case "img/Onion.png" :
      metaImg.style.width = "12%";
      metaImg.style.left = "44%";
      metaImg.style.bottom = "50%";
      metaImg.style.rotate = "20deg";
    break;
    case "img/Shrimp.png" :
      metaImg.style.width = "21%";
      metaImg.style.left = "39%";
      metaImg.style.bottom = "55%";
      metaImg.style.rotate = "30deg";
    break;
  }


  //入力後の文字の色を変える処理
  judgmentArr = judgment.split("");                     //ローマ字を1文字ずつの配列に入れる
  for (const oneArr of judgmentArr) {                   //1文字ずつ処理する
    judgmentSpan = document.createElement("span");      //spanタグを作る
    judgmentSpan.innerText = oneArr;                    //作成したspanタグに1文字入れる
    type2.appendChild(judgmentSpan);                    //htmlのtype2に作成したspanタグを追加する。
    judgmentSpan.classList.add("default");              //classをdefaultに設定
  }
}

//キーが押されたときに動作する関数
document.addEventListener("keydown",keyDown);  //キーを押すごとにkeydownイベントが発生。2個めの引数に関数を指定した場合キーが押されたとき処理が実行される
function keyDown(e) {                          //eのみだとkeyboardEventオブジェクトが出力　ドット記法でkeyというキーを選択して値を出力する。
  //スタート処理
  if (e.key === "Enter" && title.textContent === "START【Enter】") {   //Enterキーが押されたら
    correctType = 0;
    missType = 0;
    count = 60;


    title.textContent = "START!!";                                      //titleをスタートに書き換える
    //1秒後にtitleを消す
    let timeOut = function () {
    title.textContent = "";                                             //titleを空欄にする
    questions(type1);                                                   //肉(問題)を表示
    intervalStop = setInterval(timerStart,1000);                        //1秒ごとにtimerStart関数を実行する
    meatSound();

    };
    setTimeout(timeOut, 1000); //timeOut呼び出し、秒数の指定
  }
  //再スタート処理
  if (e.key === "Enter" && correctTypeStr.style.visibility === "visible") {
    correctTypeStr.style.visibility = "hidden";       //結果を非表示にする
    missTypeStr.style.visibility = "hidden";
    wps.style.visibility = "hidden";
    resultBackground.style.visibility = "hidden";
    resultText.style.visibility = "hidden";
    title.textContent = "START【Enter】"
  }
  
  //入力判定
  let judgValue = type2.querySelectorAll("span");                         //type2の中のspanタグをjudgValueに入れる
  if (e.key === judgValue[num].innerText && title.textContent === "") {   //入力したキーが合っているか判定
    judgValue[num].classList.remove("default");                           //classを削除
    judgValue[num].classList.remove("unCorrect");                         //classを削除
    judgValue[num].classList.add("correct");                              //classを追加
    correctType ++;                                                       //correctを数える
    num++;                                                                //次の文字へ行くため1プラスする
    
  }else if (e.key !==judgValue[num].innerText && e.key !== "Escape"){     //タイプミスしたとき                                                           //入力した文字が合っていなかった場合
    beep();
    judgValue[num].classList.remove("default");                           //classを削除
    judgValue[num].classList.add("unCorrect");                            //classを追加(文字が赤くなる)
    missType++;                                                           //missを数える
  }

  //終了判定
  if (num === judgValue.length) {                                         //全文字入力し終わったら
    correct();
    for(let i = 0; i < judgValue.length; i++) {                           //type2の中のspanタグを全て削除する
      const spanElement = type2.querySelector("span");                    //spanタグを一つ持ってくる
      type2.removeChild(spanElement);                                     //spanタグを削除する
    }
    questions(type1);                                                     //次の問題をセットする

  } else if (e.key === "Escape") {
    clearInterval(intervalStop);                                          //setIntervalを停止させる
    timerText.textContent = 60;
    gameEnd();
  } 
}

//終了処理
function gameEnd() {

  title.textContent = "TimeUp!!!";            //初期画面に戻す
  type1.textContent = "";
  type2.textContent = "";
  metaImg.src = "";
  grilleSound.pause();
  timeUpSound.play()
  let endTimeOut = function () {             //時間をおいてTimeUpを削除する
    title.textContent = "";

    //結果表示
    correctTypeStr.textContent = `タイプ数： ${correctType} 回`;
    missTypeStr.textContent = `ミスタイプ数： ${missType} 回`;
    correctType = correctType / 60;
    wps.textContent = `平均タイプ数： ${(Math.floor(correctType * 10)) / 10} 回/秒`;
    resultText.textContent = "<Enter>キーでタイトルに戻る"

    correctTypeStr.style.visibility = "visible";
    missTypeStr.style.visibility = "visible";
    wps.style.visibility = "visible";
    resultBackground.style.visibility = "visible";
    resultText.style.visibility = "visible";
    
  }
  setTimeout(endTimeOut, 1800);
}

//タイマー実行関数
count = 60;                                 //countを60秒に設定

function timerStart() {
  if(count > 0) {                               //countがゼロ以上であれば
    count--;                                    //-1する
    timerText.textContent = count;              //htmlにcountを表示する

  } else if (count === 0) {                     //countが0になったら
    clearInterval(intervalStop);                //setIntervalを停止させる

    timerText.textContent = 60;                 //初期値を挿入
    gameEnd();                                  //ゲームを終了させる
  }
}


//効果音
function beep() {
  beepSound.currentTime = 0;
  beepSound.play();
}
function correct() {
  correctSound.currentTime = 0;
  correctSound.play();
}
//ミュートボタン処理
function mute() {
  if (beepSound.muted) {
    beepSound.muted = false;            //false = 音が出る
    correctSound.muted = false;
    grilleSound.muted = false;
    unVol.style.visibility = "hidden";
    vol.style.visibility = "visible";
  }else {
    beepSound.muted = true;             //true = 音が出ない
    correctSound.muted = true;
    grilleSound.muted = true;
    unVol.style.visibility = "visible";
    vol.style.visibility = "hidden";
  }
}
//肉を焼く効果音
function meatSound() {
  grilleSound.currentTime = 0;
  grilleSound.play();
  grilleSound.loop = true;              //ループ処理
}

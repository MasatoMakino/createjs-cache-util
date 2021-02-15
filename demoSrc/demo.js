import {CreatejsCacheUtil} from "..";

const getRandomString = length => {
  // 生成する文字列に含める文字セット
  const c = "abcdefghijklmnopqrstuvwxyz0123456789";
  const cl = c.length;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    randomString += c[Math.floor(Math.random() * cl)];
  }
  return randomString;
};

const initTexts = stage => {
  const texts = [];
  for (let i = 0; i < 40; i++) {
    for (let j = 0; j < 30; j++) {
      const text = new createjs.Text("", "16px Meiryo", "#000");
      text.x = i * 36;
      text.y = j * 20;
      text.addEventListener("click", e => {
        console.log(i, j);
      });
      CreatejsCacheUtil.cacheText(text, "TXT");
      stage.addChild(text);
      texts.push(text);
    }
  }
  return texts;
};

const onDomContentsLoaded = () => {
  const r = getRandomString(3);

  //ステージ更新処理
  const updateStage = () => {
    if (texts) {
      for (let text of texts) {
        CreatejsCacheUtil.cacheText(text, r, { scale: 2, addHitArea: true });
      }
    }
    stage.update();
  };

  //Create.jsのグローバル設定
  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Text.prototype.snapToPixel = false;

  //stageの初期化
  const canvas = document.getElementById("textCanvas");
  canvas.width = 1280;
  canvas.height = 480;
  const stage = new createjs.Stage(canvas);
  createjs.Ticker.on("tick", updateStage);

  const texts = initTexts(stage);
};

/**
 * DOMContentLoaded以降に初期化処理を実行する
 */
if (document.readyState !== "loading") {
  onDomContentsLoaded();
} else {
  document.addEventListener("DOMContentLoaded", onDomContentsLoaded);
}

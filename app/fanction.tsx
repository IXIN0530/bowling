import { allScoreDataType, scoreDataTypes } from "./types"
const functions = () => {

  const sortData = (allScoreData: allScoreDataType[]) => {
    //日付
    const date: string[] = [];
    allScoreData.forEach((data) => {
      date.push(`${data[1][1]}/${data[2][1]}`);
    })
    //アベレージ
    const average: number[] = [];
    allScoreData.forEach((data) => {
      average.push(Number(data[3][1]));
    })
    //ハイゲーム
    const highGame: number[] = [];
    allScoreData.forEach((data) => {
      highGame.push(Number(data[4][1]));
    })
    //1投目ピン
    const firstPins: number[] = [];
    allScoreData.forEach((data) => {
      firstPins.push(Number(data[5][1].split("本")[0]));
    })
    //130UP率
    const over130: number[] = [];
    allScoreData.forEach((data) => {
      over130.push(Number(data[6][1].split("%")[0].split("/")[1]));
    })
    //150UP率
    const over150: number[] = [];
    allScoreData.forEach((data) => {
      over150.push(Number(data[7][1].split("%")[0].split("/")[1]));
    })
    //180UP率
    const over180: number[] = [];
    allScoreData.forEach((data) => {
      over180.push(Number(data[8][1].split("%")[0].split("/")[1]));
    })
    //200UP率
    const over200: number[] = [];
    allScoreData.forEach((data) => {
      over200.push(Number(data[9][1].split("%")[0].split("/")[1]));
    })
    //ストライク率
    const strike: number[] = [];
    allScoreData.forEach((data) => {
      strike.push(Number(data[10][1].split("/")[1].split("/")[0].split("%")[0]));
    })
    //スペア率
    const spare: number[] = [];
    allScoreData.forEach((data) => {
      spare.push(Number(data[11][1].split("/")[1].split("/")[0].split("%")[0]));
    })
    //オープンフレーム率
    const openFrame: number[] = [];
    allScoreData.forEach((data) => {
      openFrame.push(Number(data[12][1].split("/")[1].split("/")[0].split("%")[0]));
    })
    //ヘッドピンブレイク率
    const headPin: number[] = [];
    allScoreData.forEach((data) => {
      headPin.push(Number(data[13][1].split("/")[1].split("/")[0].split("%")[0]));
    })
    //ノーミスゲーム率
    const noMiss: number[] = [];
    allScoreData.forEach((data) => {
      noMiss.push(Number(data[14][1].split("%")[0].split("/")[1]));
    })
    //スプリットメイク率
    const splitMake: number[] = [];
    allScoreData.forEach((data) => {
      splitMake.push(Number(data[15][1].split("%")[0].split("/")[1]));
    })
    //パーフェクトゲーム
    const perfectGame: number[] = [];
    allScoreData.forEach((data) => {
      perfectGame.push(Number(data[16][1].split("回")[0]));
    })
    //最高連続ストライク
    const highStrike: number[] = [];
    allScoreData.forEach((data) => {
      highStrike.push(Number(data[17][1].split("回")[0]));
    })
    //連スト2回率
    const highStrike2: number[] = [];
    allScoreData.forEach((data) => {
      highStrike2.push(Number(data[18][1].split("%")[0].split("/")[1]));
    })
    //連スト3回率
    const highStrike3: number[] = [];
    allScoreData.forEach((data) => {
      highStrike3.push(Number(data[19][1].split("%")[0].split("/")[1]));
    })
    //連スト4回率
    const highStrike4: number[] = [];
    allScoreData.forEach((data) => {
      highStrike4.push(Number(data[20][1].split("%")[0].split("/")[1]));
    })
    //連スト5回率
    const highStrike5: number[] = [];
    allScoreData.forEach((data) => {
      highStrike5.push(Number(data[21][1].split("%")[0].split("/")[1]));
    })
    //連スト6回率
    const highStrike6: number[] = [];
    allScoreData.forEach((data) => {
      highStrike6.push(Number(data[22][1].split("%")[0].split("/")[1]));
    })
    //連スト7回率
    const highStrike7: number[] = [];
    allScoreData.forEach((data) => {
      highStrike7.push(Number(data[23][1].split("%")[0].split("/")[1]));
    })
    //連スト8回率
    const highStrike8: number[] = [];
    allScoreData.forEach((data) => {
      highStrike8.push(Number(data[24][1].split("%")[0].split("/")[1]));
    })
    //連スト9回率
    const highStrike9: number[] = [];
    allScoreData.forEach((data) => {
      highStrike9.push(Number(data[25][1].split("%")[0].split("/")[1]));
    })
    //連スト10回率
    const highStrike10: number[] = [];
    allScoreData.forEach((data) => {
      highStrike10.push(Number(data[26][1].split("%")[0].split("/")[1]));
    })
    //連スト11回率
    const highStrike11: number[] = [];
    allScoreData.forEach((data) => {
      highStrike11.push(Number(data[27][1].split("%")[0].split("/")[1]));
    })
    //ハイゲーム更新
    const highGameUpdate: number[] = [];
    allScoreData.forEach((data) => {
      highGameUpdate.push(Number(data[28][1].split("回")[0]));
    })
    //通算ゲーム
    const totalGames: number[] = [];
    allScoreData.forEach((data) => {
      totalGames.push(Number(data[29][1].split("ゲ")[0]));
    })
    //1日平均ゲーム
    const averageGame: number[] = [];
    allScoreData.forEach((data) => {
      averageGame.push(Number(data[30][1].split("回")[0]));
    })
    return {
      "来店日": date,
      "アベレージ": average,
      "ハイゲーム": highGame,
      "1投目ピン": firstPins,
      "130UP率": over130,
      "150UP率": over150,
      "180UP率": over180,
      "200UP率": over200,
      "ストライク率": strike,
      "スペア率": spare,
      "オープンフレーム率": openFrame,
      "ヘッドピンブレイク率": headPin,
      "ノーミスゲーム率": noMiss,
      "スプリットメイク率": splitMake,
      "パーフェクトゲーム": perfectGame,
      "最高連続ストライク": highStrike,
      "連スト2回率": highStrike2,
      "連スト3回率": highStrike3,
      "連スト4回率": highStrike4,
      "連スト5回率": highStrike5,
      "連スト6回率": highStrike6,
      "連スト7回率": highStrike7,
      "連スト8回率": highStrike8,
      "連スト9回率": highStrike9,
      "連スト10回率": highStrike10,
      "連スト11回率": highStrike11,
      "ハイゲーム更新": highGameUpdate,
      "通算ゲーム": totalGames,
      "1日平均ゲーム": averageGame,
    }


  }

  const keys = [
    "来店日",
    "アベレージ",
    "ハイゲーム",
    "1投目ピン",
    "130UP率",
    "150UP率",
    "180UP率",
    "200UP率",
    "ストライク率",
    "スペア率",
    "オープンフレーム率",
    "ヘッドピンブレイク率",
    "ノーミスゲーム率",
    "スプリットメイク率",
    "パーフェクトゲーム",
    "最高連続ストライク",
    "連スト2回率",
    "連スト3回率",
    "連スト4回率",
    "連スト5回率",
    "連スト6回率",
    "連スト7回率",
    "連スト8回率",
    "連スト9回率",
    "連スト10回率",
    "連スト11回率",
    "ハイゲーム更新",
    "通算ゲーム",
    "1日平均ゲーム",
  ];

  return {
    sortData,
    keys,
  }
}

export default functions;
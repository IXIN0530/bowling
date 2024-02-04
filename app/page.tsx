"use client"
import GetScoreData from "./components/getScoreData";
import DisplayScoreData from "./components/diplayScoreData";
import { allScoreDataType, scoreDataTypes } from "./types";
import apiClient from "./backend/apiClient";
import React, { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import DataList from "./components/dataList";
import ScoreModal from "./components/scoreModal";

export default function Home() {
  //スコア情報のモーダルが開かれているか
  const [isScoreOpen, setIsScoreOpen] = useState<boolean>(false);
  const [scoreModalData, setScoreModalData] = useState<scoreDataTypes[]>([]);

  const [allScoreData, setAllScoreData] = useState<allScoreDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const id1 = useRef(1182);
  const id2 = useRef(524);
  const id3 = useRef(797);
  const password = useRef("0530masa");
  const didMount = useRef(false);

  //モーダルのクローズ処理
  const closeScoreModal = () => {
    setIsScoreOpen(false);
  }
  //データの更新関数
  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await apiClient.get<scoreDataTypes[]>(`/login/${id1.current}/${id2.current}/${id3.current}/${password.current}`)
      if (response.data.length && allScoreData.length) {
        console.log(response.data)
        //最新のデータと前回のデータが一致
        if (allScoreData[allScoreData.length - 1][0][1] == response.data[0][1] && allScoreData[allScoreData.length - 1][1][1] == response.data[1][1] && allScoreData[allScoreData.length - 1][2][1] == response.data[2][1]) {
          console.log("最新のデータと前回のデータが一致");
        }
        else {
          //最新のデータと前回のデータが一致しない
          console.log("最新のデータと前回のデータが一致しない");
          setAllScoreData([...allScoreData, response.data]);
        }
      }
      else if (response.data.length && !allScoreData.length) {
        //初回のデータ取得
        console.log("初回のデータ取得");
        setAllScoreData([...allScoreData, response.data]);
      }

      setIsLoading(false);
    } catch (err: any) {
      setError(err.message)
    }
  }
  //localの初期化
  // localStorage.removeItem("allScoreData");
  //データの読み込み
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      const jsonData = localStorage.getItem("allScoreData");
      if (jsonData) {
        const data = JSON.parse(jsonData);
        setAllScoreData(data);
        console.log("getItemしました", data)
      }
    } else {
      if (allScoreData.length) {
        localStorage.setItem("allScoreData", JSON.stringify(allScoreData));
        console.log("setItemしました", allScoreData)
      }
    }
  }, [allScoreData]);
  return (
    <div className=" mx-2 min-h-[100svh] grid grid-rows-10">
      {scoreModalData && <ScoreModal closeScoreModal={closeScoreModal} isOpen={isScoreOpen} scoreModalData={scoreModalData} />}
      <div className=" row-span-1 bg-orange-100">
      </div>
      <div className="row-span-4 bg-slate-300">
        {isLoading ? (!error ? <p className="text-center my-4">loading...</p> : null)
          : allScoreData.map((item, index) => (<DataList data={item} setScoreModalData={setScoreModalData} setIsScoreOpen={setIsScoreOpen} />))
        }
      </div>
      <div className="row-span-4 bg-slate-400"></div>
      <div className="row-span-1 bg-slate-500">
        {error ? <p className="text-center">{error}アカウント情報が間違っているか通信環境が悪い可能性があります。</p> : null}
        <button onClick={fetchData} className=" bg-emerald-400 block px-4 mx-auto p-2 shadow-xl m-2 rounded-xl text-white">更新</button>
      </div>
    </div>
  );
}

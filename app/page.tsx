"use client"
import { allScoreDataType, scoreDataTypes } from "./types";
import apiClient from "./backend/apiClient";
import React, { useEffect, useRef, useState } from "react";
import DataList from "./components/dataList";
import ScoreModal from "./components/scoreModal";
import { motion } from "framer-motion";
import MenuModal from "./components/menuModal";
import MainIcon from "./components/Home/mainIcon";
import { stringify } from "querystring";

export default function Home() {
  //スコア情報のモーダルが開かれているか
  const [isScoreOpen, setIsScoreOpen] = useState<boolean>(false);
  const [scoreModalData, setScoreModalData] = useState<scoreDataTypes[]>([]);

  //メニューのモーダル関連
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [allScoreData, setAllScoreData] = useState<allScoreDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [id1, setId1] = useState<number>(0);
  const [id2, setId2] = useState<number>(0);
  const [id3, setId3] = useState<number>(0);
  const [pass, setPass] = useState<string>("");
  const didMount = useRef<boolean>(false);

  //モーダルのクローズ処理
  const closeScoreModal = () => {
    setIsScoreOpen(false);
  }
  //データの更新関数
  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await apiClient.get<scoreDataTypes[]>(`/login/${id1}/${id2}/${id3}/${pass}`)
      if (response.data.length && allScoreData.length) {
        console.log(response.data)
        //最新のデータと今取得したデータが一致
        if (allScoreData[allScoreData.length - 1][3][1] == response.data[3][1] && allScoreData[allScoreData.length - 1][0][1] == response.data[0][1] && allScoreData[allScoreData.length - 1][1][1] == response.data[1][1] && allScoreData[allScoreData.length - 1][2][1] == response.data[2][1]) {
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


    } catch (err: any) {
      setError(err.message)
      alert("アカウント情報が間違っているか通信環境が悪い可能性があります。")
    }
    setIsLoading(false);
  }
  //localの初期化
  // localStorage.removeItem("allScoreData" + stringify({ id1, id2, id3 }));
  //データの読み込み
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      const jsonId1 = localStorage.getItem("id1");
      const jsonId2 = localStorage.getItem("id2");
      const jsonId3 = localStorage.getItem("id3");
      const jsonPass = localStorage.getItem("pass");
      console.log("getItemしました", jsonId1, jsonId2, jsonId3, jsonPass);
      if (jsonId1 && jsonId2 && jsonId3 && jsonPass) {
        const id1 = JSON.parse(jsonId1);
        const id2 = JSON.parse(jsonId2);
        const id3 = JSON.parse(jsonId3);
        const pass = JSON.parse(jsonPass);
        setId1(Number(id1));
        setId2(Number(id2));
        setId3(Number(id3));
        setPass(pass);
        const jsonData = localStorage.getItem("allScoreData" + stringify({ id1, id2, id3 }));
        if (jsonData) {
          const data = JSON.parse(jsonData);
          setAllScoreData(data);
        }
        console.log("getItemしました", Number(id1), Number(id2), Number(id3), pass);
      }
    } else {
      if (allScoreData.length) {
        localStorage.setItem("allScoreData" + stringify({ id1, id2, id3 }), JSON.stringify(allScoreData));
        localStorage.setItem("id1", JSON.stringify(id1));
        localStorage.setItem("id2", JSON.stringify(id2));
        localStorage.setItem("id3", JSON.stringify(id3));
        localStorage.setItem("pass", JSON.stringify(pass));
        console.log("setItemしました", allScoreData, id1, id2, id3, pass);
      }
    }
  }, [allScoreData]);
  return (
    <div className=" mx-2 min-h-[100svh] grid grid-rows-10 ">
      {scoreModalData && <ScoreModal closeScoreModal={closeScoreModal} isOpen={isScoreOpen} scoreModalData={scoreModalData} />}
      <div className="flex flex-col justify-between row-span-1  bg-gradient-to-b from-gray-600 to-gray-400">
        {/* {error ? <p className="text-center">{error}アカウント情報が間違っているか通信環境が悪い可能性があります。</p> : null} */}
        <div></div>
        <div className="grid grid-cols-3  text-white ">
          <p className="col-span-1 text-center">来店日</p>
          <p className="col-span-1 text-center">アベレージ</p>
          <p className="col-span-1 text-center">ハイゲーム</p>
        </div>
      </div>
      <div className="row-span-4 bg-slate-300">
        {isLoading ? (!error ? <p className="text-center my-4">loading...</p> : null)
          : allScoreData.map((item, index) => (<DataList key={index} data={item} setScoreModalData={setScoreModalData} setIsScoreOpen={setIsScoreOpen} />))
        }
      </div>
      <div className="row-span-4 bg-slate-400">

      </div>
      <div className="row-span-1 bg-slate-500 flex justify-evenly overflow-hidden">
        <motion.div
          className="my-auto"
          animate={isLoading ? { rotate: [0, 180, 360], scale: [1, 1.5, 1] } : {}}
          transition={isLoading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}>
          <MainIcon />
        </motion.div>
        <button onClick={fetchData} className="  bg-gradient-to-br from-emerald-600 to-emerald-400 block px-8 p-2 shadow-xl m-2 rounded-xl text-white font-lg">更新</button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => setIsMenuOpen(true)} className="w-10 h-10 my-auto text-white cursor-pointer">
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </div>
      <MenuModal
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        id1={id1}
        setId1={setId1}
        id2={id2}
        setId2={setId2}
        id3={id3}
        setId3={setId3}
        password={pass}
        setPassword={setPass} />
    </div>
  );
}

"use client"
import { allScoreDataType, scoreDataTypes } from "./types";
import React, { useEffect, useRef, useState } from "react";
import DataList from "./components/dataList";
import ScoreModal from "./components/scoreModal";
import { motion, useMotionValue, useTransform } from "framer-motion";
import MenuModal from "./components/menuModal";
import MainIcon from "./components/Home/mainIcon";
import { stringify } from "querystring";
import api from "./components/api";
import { kv } from "@vercel/kv";
import next from "next";
import { NextResponse } from "next/server";
import functions from "./fanction";
import DisplayChart from "./components/displayChart";
import Image from "next/image";

export default function Home() {
  //スコア情報のモーダルが開かれているか
  const [isScoreOpen, setIsScoreOpen] = useState<boolean>(false);
  const [scoreModalData, setScoreModalData] = useState<scoreDataTypes[]>([]);

  //selectを一回クリックしたか
  const [isSelectClicked, setIsSelectClicked] = useState<boolean>(false);

  //データのグラフを表示する関連
  // var sortedData: { [key: string]: number[] | string[] } = {};
  const [sortedData, setSortedData] = useState<{ [key: string]: number[] | string[] }>({}); //ここで型を指定しないとエラーが出る
  const [whatDisplay, setWhatDisplay] = useState<string>("ハイゲーム");
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWhatDisplay(e.target.value);
  }

  //メニューのモーダル関連
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [allScoreData, setAllScoreData] = useState<allScoreDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [id1, setId1] = useState<string>("0");
  const [id2, setId2] = useState<string>("0");
  const [id3, setId3] = useState<string>("0");
  const [password, setPassword] = useState<string>("");
  const didMount = useRef<boolean>(false);

  //selectが一回押されたかどうか
  const selectClicked = () => {
    if (isSelectClicked) return;
    setIsSelectClicked(true);
  }

  //関数の読み込み
  const { sortData, keys } = functions();

  console.log("password", password);
  //モーダルのクローズ処理
  const closeScoreModal = () => {
    setIsScoreOpen(false);
  }
  //データの更新関数
  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = {
        "id1": id1,
        "id2": id2,
        "id3": id3,
        "password": password,
      }
      const response = await api.post<scoreDataTypes[]>(`/login`, data);
      if (response.data.length && allScoreData.length) {
        console.log(response.data)
        //最新のデータと今取得したデータが一致
        if (allScoreData[allScoreData.length - 1][3][1] == response.data[3][1] && allScoreData[allScoreData.length - 1][0][1] == response.data[0][1] && allScoreData[allScoreData.length - 1][1][1] == response.data[1][1] && allScoreData[allScoreData.length - 1][2][1] == response.data[2][1]) {
          console.log("最新のデータと前回のデータが一致");
          //同じ日にちだけど更新した場合
          if (allScoreData[allScoreData.length - 1][3][0] == response.data[3][0]) {
            console.log("同じ日にちだけど更新した場合");
            const _allScoreData = allScoreData.slice(0, allScoreData.length - 1);
            _allScoreData.push(response.data);
            setAllScoreData(_allScoreData);
          }
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

  //テスト



  //localの初期化
  // localStorage.removeItem("allScoreData" + stringify({ id1, id2, id3 }));
  //データの読み込み
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      const jsonId1 = localStorage.getItem("id1");
      const jsonId2 = localStorage.getItem("id2");
      const jsonId3 = localStorage.getItem("id3");
      const jsonPass = localStorage.getItem("password");
      console.log("getItemしました", jsonId1, jsonId2, jsonId3, jsonPass);
      if (jsonId1 && jsonId2 && jsonId3 && jsonPass) {
        const id1 = JSON.parse(jsonId1);
        const id2 = JSON.parse(jsonId2);
        const id3 = JSON.parse(jsonId3);
        const password = JSON.parse(jsonPass);
        setId1((id1));
        setId2((id2));
        setId3((id3));
        setPassword(password);
        const jsonData = localStorage.getItem("allScoreData" + stringify({ id1, id2, id3 }));

        if (jsonData) {
          const data = JSON.parse(jsonData);
          setAllScoreData(data);
        }
        console.log("getItemしました", Number(id1), Number(id2), Number(id3), password);
      }
    } else {
      if (allScoreData.length) {
        localStorage.setItem("allScoreData" + stringify({ id1, id2, id3 }), JSON.stringify(allScoreData));
        localStorage.setItem("id1", JSON.stringify(id1));
        localStorage.setItem("id2", JSON.stringify(id2));
        localStorage.setItem("id3", JSON.stringify(id3));
        localStorage.setItem("password", JSON.stringify(password));
        console.log("setItemしました", allScoreData, id1, id2, id3, password);
      }
    }

    //取得したデータの整理
    if (allScoreData.length) {
      console.log("sortData", sortData(allScoreData));
      setSortedData(sortData(allScoreData));
      console.log("sortedData", sortedData);
    }
    console.log("allScoreData", allScoreData);
  }, [allScoreData]);

  // //実験
  // const setData = async () => {
  //   await kv.set("allScoreData" + stringify({ id1, id2, id3 }), JSON.stringify(allScoreData));
  //   console.log("kv.setしました");
  // }
  // const getData = async () => {
  //   const data = await kv.get("allScoreData" + stringify({ id1, id2, id3 }));
  //   console.log("kv.getしました", NextResponse.json(data));
  // }
  return (
    <div className=" mx-2 min-h-[100svh] grid grid-rows-10">
      {scoreModalData && <ScoreModal closeScoreModal={closeScoreModal} isOpen={isScoreOpen} scoreModalData={scoreModalData} />}
      <div className="relative flex flex-col justify-between row-span-1  bg-[#aaaaaa55]">
        <Image src={"/backTest.gif"} className=" absolute inset-0 h-full w-full -z-10" width={50} height={10} alt="" />
        <div className="pt-2">
          <p className="text-center text-white text-2xl">Splitter</p>
        </div>
        <div className="grid grid-cols-3 text-white">
          <p className="col-span-1 text-center">来店日</p>
          <p className="col-span-1 text-center">アベレージ</p>
          <motion.select value={whatDisplay} onChange={handleChange} className="col-span-1 text-center bg-opacity-0  bg-white appearance-none rounded-lg"
            onClick={selectClicked}
            animate={!isSelectClicked ? { scale: [1, 1.2, 1] } : {}}
            transition={!isSelectClicked ? { duration: [1], repeat: Infinity, ease: "linear" } : {}}>
            {keys.map((key, index) => key == "ハイゲーム" ? <option value={key} className="opacity-50" selected>{key}</option> :
              index ? <option value={key} className="opacity-50" >{key}</option> : false)}
          </motion.select>
        </div>
      </div>
      <div className=" relative row-span-4 bg-slate-300 overflow-scroll">
        <div className="absolute inset-0">
          {isLoading ? (!error ? <p className="text-center my-4">loading...</p> : null)
            : allScoreData.map((item, index) => (<DataList whatDisplay={sortedData ? sortedData[whatDisplay] : []} index={index} data={item} setScoreModalData={setScoreModalData} setIsScoreOpen={setIsScoreOpen} />))
          }
        </div>
      </div>
      <div className="row-span-4 bg-slate-400 flex justify-evenly"
      >
        <DisplayChart
          displayData={sortedData ? sortedData[whatDisplay] : []}
          days={sortedData ? sortedData["来店日"] : []} />
      </div>
      <div className=" relative row-span-1 bg-[#aaaaaa55] flex justify-evenly overflow-hidden">
        <Image src={"/backTest.gif"} className=" absolute inset-0 h-full w-full -z-10" width={50} height={10} alt="" />
        <motion.div
          className="my-auto"
          animate={isLoading ? { rotate: [0, 180, 360], scale: [1, 1.5, 1] } : {}}
          transition={isLoading ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}>
          <MainIcon
            isLoading={isLoading} />
        </motion.div>

        <button onClick={fetchData} className={!isLoading ? " bg-gradient-to-br from-emerald-600 to-emerald-400 block px-8 p-2 shadow-xl m-2 rounded-xl text-white font-lg" : "bg-gradient-to-br from-emerald-700 to-emerald-500 block px-8 p-2 shadow-xl m-2 rounded-xl text-white font-lg"}>更新</button>
        <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" onClick={() => setIsMenuOpen(true)} className="w-10 h-10 my-auto text-white cursor-pointer"
          animate={!isMenuOpen ? { rotate: 0, opacity: 1, scale: 1 } : { rotate: -90, opacity: 0, scale: 0.8 }}>
          <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </motion.svg>
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
        password={password}
        setPassword={setPassword} />
    </div>
  );
}

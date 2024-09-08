"use client"
import { scoreDataTypes } from "../types";
import { MouseEvent } from "react";
import DisplayScoreData from "./diplayScoreData";
type Props = {
  isOpen: boolean;
  scoreModalData: scoreDataTypes[];
  closeScoreModal: () => void;
}
const ScoreModal = ({ isOpen, scoreModalData, closeScoreModal }: Props) => {
  //モダールがオープンされているかの確認
  if (!isOpen) return null;

  console.log("モーダルが開かれたで");

  const hundleModalClick = (e: MouseEvent) => {
    //親要素への伝搬を防ぐ
    e.stopPropagation();
  }

  const hundleBackClick = (e: MouseEvent) => {
    closeScoreModal();
    e.stopPropagation();
  }

  return (
    <div className="fixed z-50 inset-2 overflow-y-auto h-4/5"
      onClick={hundleBackClick}>
      <div className="fixed inset-0 bg-black opacity-65 transition-opacity"></div>

      <div className=" bg-gradient-to-b from-slate-200 to-white mx-2 shadow-xl rounded-xl transform transition-all my-5"
        onClick={hundleModalClick}>
        {/* ここからがmodalの中身 */}
        <DisplayScoreData scoreData={scoreModalData} />
        <div className="pt-8"></div>
      </div>
    </div>
  )
}

export default ScoreModal;
import { scoreDataTypes } from "../types";
import Num from "./font/Num";
type Props = {
  data: scoreDataTypes[];
  setScoreModalData: (scoreModalData: scoreDataTypes[]) => void;
  setIsScoreOpen: (isScoreOpen: boolean) => void;
  index: number;
  whatDisplay: number[] | string[];
}



const DataList = ({ data, setScoreModalData, setIsScoreOpen, index, whatDisplay }: Props) => {
  const clicked = () => {
    setScoreModalData(data);
    setIsScoreOpen(true);
    console.log("クリックされたで");
  }
  return (
    <div className="w-full grid grid-cols-3 bg-gradient-to-bl from-black to-gray-500  text-white" onClick={clicked}>
      <div className={"col-span-1 shadow-side-inner py-2"}>
        <p className="text-center">
          {data[0][1]}/{data[1][1]}/{data[2][1]}
        </p>
      </div>
      <div className="col-span-1 py-2 shadow-side-inner ">
        <p className="text-center">
          {data[3][1]}
        </p>
      </div>
      <div className="col-span-1 py-2 shadow-side-inner ">
        {/* 読み込み時間のせいで、何も入っていない時は何も表示しないふうにしないとバグる */}
        {!whatDisplay ? "" : <Num Number={whatDisplay[index]} />}
      </div>
    </div>
  )
}

export default DataList;
import { scoreDataTypes } from "../types";
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
    <div className="w-full grid grid-cols-3 bg-gradient-to-br from-gray-500 to-gray-400 py-2 text-white" onClick={clicked}>
      <div className=" col-span-1">
        <p className="text-center">
          {data[0][1]}/{data[1][1]}/{data[2][1]}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-center">
          {data[3][1]}
        </p>
      </div>
      <div className="col-span-1">
        <p className="text-center">
          {/* 読み込み時間のせいで、何も入っていない時は何も表示しないふうにしないとバグる */}
          {!whatDisplay ? "" : whatDisplay[index]}
        </p>
      </div>
    </div>
  )
}

export default DataList;
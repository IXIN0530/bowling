import { scoreDataTypes } from "../types";
type Props = {
  scoreData: scoreDataTypes[];
}
const DisplayScoreData = ({ scoreData }: Props) => {
  const _scoreData = scoreData.slice(3, scoreData.length);
  return (
    <div>
      <p className="text-center my-2">{scoreData[0][1]}/{scoreData[1][1]}/{scoreData[2][1]}</p>
      <div className="flex flex-col  w-4/5 mx-auto">
        {_scoreData ? _scoreData.map((item, index) => (
          <div className=" flex justify-between">
            <div className="bg-sky-200 w-1/2 text-center pt-1 whitespace-nowrap overflow-scroll hidden-scrollbar">{item[0]}</div>
            <div className="bg-orange-200 w-1/2 pt-1 text-center whitespace-nowrap overflow-scroll hidden-scrollbar">{item[1]}</div>
          </div>
        )) : null}
      </div>
    </div>
  )
}

export default DisplayScoreData;

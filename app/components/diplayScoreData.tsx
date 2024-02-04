import { scoreDataTypes } from "../types";
type Props = {
  scoreData: scoreDataTypes[];
}
const DisplayScoreData = ({ scoreData }: Props) => {
  return (
    <div className="flex flex-col  w-4/5 mx-auto">
      {scoreData ? scoreData.map((item) => (
        <div className=" flex justify-between">
          <div className="bg-sky-200 w-1/2 overflow-hidden pt-1">{item[0]}</div>
          <div className="bg-orange-200 w-1/2 pt-1">{item[1]}</div>
        </div>
      )) : null}
    </div>
  )
}

export default DisplayScoreData;
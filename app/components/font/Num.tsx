import Image from "next/image";
import Display from "./DIsplay";
type Props = {
  //こう書いてるけど実際はnumber型で統一されているはず
  Number: number | string;
}

const Num = ({ Number }: Props) => {

  const numArray = makeArray(typeof (Number) == "number" ? Number : 0);

  //整数部分と少数部分を判別するための変数
  var isInt = true;
  return (
    <div className="h-full flex justify-center">
      <div className=" flex justify-center">
        {numArray.map((num, index) => {
          if (num == ".") {
            isInt = false;
          }
          return (
            <Display key={index} num={num} big={isInt} />
          )
        })}
      </div>
    </div>
  )
}

const makeArray = (num: number) => {
  const array: string[] = [];
  const str = num.toString();
  for (let i = 0; i < str.length; i++) {
    array.push(str[i]);
  }
  //整数も少数表示に
  if (array.indexOf(".") == -1) {
    array.push(".");
    array.push("0");
    array.push("0");
  }
  //小数点以下を合わせる
  var counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[str.length - i - 1] == ".") break;
    counter++;
  }
  for (let i = 0; i < 2 - counter; i++) {
    array.push("0");
  }
  return array;
}

export default Num;
import Image from "next/image"
type Props = {
  num: string,
  big: boolean,
}
const Display = ({ num, big }: Props) => {
  const sizeOf1 = 11;
  const sizeOfElse = 15;
  if (num == ".") {
    return (
      <div className="h-full grid grid-rows-4 px-[1px]">
        <div className="row-span-1"></div>
        <div className="row-span-1"></div>
        <div className="row-span-1"></div>
        <Image src={`/DamFont/DamDot.png`} className="h-full row-span-1 w-1" height={1} width={15} alt="" />
      </div>
    )
  }

  //整数部分か少数部分かで表示を変更する
  if (big) {
    return (
      <Image src={`/DamFont/Dam${num}.png`} className="h-full"
        height={1} width={(num == "1" ? sizeOf1 : sizeOfElse)}
        alt=""
        unoptimized />
    )
  }
  //少数部分
  else {
    return (
      <div className="h-full grid grid-rows-2 ">
        <div className=" row-span-1"></div>
        <Image src={`/DamFont/Dam${num}.png`} className="h-full row-span-1"
          height={1} width={(num == "1" ? sizeOf1 / 2 : sizeOfElse / 2)}
          alt=""
          unoptimized />
      </div>
    )

  }
}

export default Display;
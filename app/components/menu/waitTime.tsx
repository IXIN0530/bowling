import shopList from "./shopList"
import { useState } from "react";
type Props = {
  isWaitTimeOpen: boolean
  setIsWaitTimeOpen: (isWayOpen: boolean) => void
}
const WaitTime = ({ isWaitTimeOpen, setIsWaitTimeOpen }: Props) => {
  const [searchShops, setSearchShops] = useState<string>("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchShops(e.target.value);
  }

  const filteredShops = shopList.filter((item) => {
    return new RegExp(searchShops).test(item.shop);
  })
  return (
    <div className="col-span-1 grid grid-rows-10">
      <div className="row-span-4 text-center  overflow-scroll grid grid-rows-10">
        <p className=" row-span-2 my-auto text-center text-white pb-2">店舗検索</p>
        <input onChange={inputChange} className="w-3/4 mx-auto row-span-1  bg-gray-500  text-white text-center rounded-lg"></input>

        <div className="row-span-1">{/*空白*/}</div>
        <div className=" relative overflow-scroll row-span-6">
          <div className="absolute inset-0 grid grid-cols-2 ">
            {filteredShops.map((item, index) => (
              <div key={index} className=" h-10 col-span-1 text-white  text-sm flex flex-col justify-center">
                <p className="">{item.shop}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row-span-1">

      </div>
      <div className="row-span-4 grid grid-rows-5">
        <div className="row-span-1 text-center text-white text-xl">
          ららぽーと新三号
        </div>
        <div className="text-center text-white row-span-1 text-xl">
          17:15現在
        </div>
        <div className="row-span-2 bg-sky-300 flex">
          <div className="text-4xl">67</div>
          <div className="text-xl">分待ち</div>
        </div>
        <div className="row-span-1"></div>
      </div>
      <div className="row-span-1 flex  justify-end">
        <svg onClick={() => setIsWaitTimeOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-2 text-white w-8 h-8">
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </div>
    </div>
  )
}

export default WaitTime;
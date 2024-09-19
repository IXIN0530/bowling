import shopList from "./shopList"
import { useState } from "react";
import { Rampart_One } from "next/font/google";
import api from "../api";
import { url } from "inspector";
import PopUp from "../Home/popUp";

const inter = Rampart_One({ weight: "400", subsets: ["latin"] });
type Props = {
  isWaitTimeOpen: boolean
  setIsWaitTimeOpen: (isWayOpen: boolean) => void
}

const WaitTime = ({ isWaitTimeOpen, setIsWaitTimeOpen }: Props) => {
  const [searchShops, setSearchShops] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //待ち時間検索により取得した各種データ
  const [shopName, setShopName] = useState<string>("");
  const [nowTime, setNowTime] = useState<string>("");
  const [waitTime, setWaitTime] = useState<string>("");
  const [groups, setGroups] = useState<string>("");

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchShops(e.target.value);
  }

  const filteredShops = shopList.filter((item) => {
    return new RegExp(searchShops).test(item.shop);
  })

  //店舗ボタンが押された時の処理
  const shopClick = async (shopName: string) => {
    setIsLoading(true);
    setShopName(shopName);
    setNowTime("");
    setWaitTime("");
    setGroups("");
    const data = {
      shop_id: shopList.find((item) => item.shop === shopName)?.id
    }
    try {
      const res = await api.post<string[]>("/waitTime", data);
      if (res.data.length) {
        setNowTime(res.data[0]);
        setWaitTime(res.data[1]);
        setGroups(res.data[2]);
        setIsLoading(false);
      }
    } catch (e) {
      alert("エラーが発生しました");
      setIsLoading(false);
    }

  }
  return (
    <div className="col-span-1 grid grid-rows-10">
      <div className="row-span-4 text-center  overflow-scroll grid grid-rows-10">
        <p className=" row-span-2 my-auto text-center text-white pb-2">店舗検索</p>
        <input onChange={inputChange} className="w-3/4 mx-auto row-span-1  bg-gray-500  text-white text-center rounded-lg"></input>

        <div className="row-span-1">{/*空白*/}</div>
        <div className=" relative overflow-scroll row-span-6">
          <div className="absolute inset-0 grid grid-cols-2 ">
            {filteredShops.map((item, index) => (
              <div key={index} className=" h-10 col-span-1 text-white  text-sm flex flex-col justify-center"
                onClick={() => shopClick(item.shop)}>
                <p className="">{item.shop}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row-span-1">

      </div>
      <div className="row-span-3 grid grid-rows-5">
        <div className="row-span-1 text-center text-white text-xl">
          {shopName}
        </div>
        <div className="text-center text-white row-span-1 text-xl">
          {nowTime == "false" ? "営業時間外" : nowTime + "現在待ち"}
        </div>
        <div className={inter.className + " row-span-2  flex justify-center gap-3"}>
          <p className="text-3xl my-auto text-center text-white">{waitTime == "false" ? "" : waitTime + "分"}</p>
          <p className="text-3xl my-auto text-center text-white ">{groups == "false" ? "" : groups + "組"}</p>
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
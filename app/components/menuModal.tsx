"use client"
import { FormEvent, MouseEvent, useRef } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
type MenuModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  id1: string
  setId1: (id1: string) => void
  id2: string
  setId2: (id2: string) => void
  id3: string
  setId3: (id3: string) => void
  password: string
  setPassword: (password: string) => void
}
const MenuModal = ({ isOpen, setIsOpen, id1, setId1, id2, setId2, id3, setId3, password, setPassword }: MenuModalProps) => {
  //モダールがオープンされているかの確認
  if (!isOpen) return null;

  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isWayOpen, setIsWayOpen] = useState<boolean>(false);

  const id1Ref = useRef<HTMLInputElement | null>(null);
  const id2Ref = useRef<HTMLInputElement | null>(null);
  const id3Ref = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const loginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setId1((id1Ref.current!.value));
    setId2((id2Ref.current!.value));
    setId3((id3Ref.current!.value));
    setPassword(passwordRef.current!.value);
    setIsLoginOpen(false);
    setIsWayOpen(false);
  }

  const hundleModalClick = (e: MouseEvent) => {
    //親要素への伝搬を防ぐ
    e.stopPropagation();
  }

  const hundleBackClick = (e: MouseEvent) => {
    //親要素への伝搬を防ぐ
    e.stopPropagation();
    setIsOpen(false);
    setIsLoginOpen(false);
    setIsWayOpen(false);
  }

  const loginClick = () => {
    setIsLoginOpen(true);
  }
  const wayClick = () => {
    setIsWayOpen(true);
  }
  return (
    <div className="fixed z-50 inset-2 overflow-y-auto h-4/5 "
      onClick={hundleBackClick}>
      <div className=" fixed inset-0 bg-black opacity-65  transition-opacity"></div>

      <motion.div className=" overflow-hidden fixed h-4/5 w-full right-0 top-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-500 shadow-xl transform transition-all "
        onClick={hundleModalClick}
        initial={{ x: "300%" }}
        animate={{ x: "50%" }}
        transition={{ duration: "0.03" }}>
        {/* ここからがmodalの中身 */}

        <motion.div className="min-h-full grid grid-cols-2"
          animate={{ x: (isLoginOpen || isWayOpen) ? "-50%" : 0 }}>
          <div className="grid grid-rows-10 col-span-1">
            <div className="row-span-1 flex flex-col justify-center">
              <p className="text-white text-center font-bold">メニュー</p>
            </div>
            <div className=" mx-4 row-span-1">
              <p className="text-center text-white text-xs italic">Splitterはラウンドワンボウリングのスコアを管理するアプリです</p>
            </div>
            <div className="row-span-5">
              {/* <p className="text-white">menues</p> */}
            </div>
            <div className="row-span-1" >
              <p onClick={wayClick} className="text-center text-white border-b border-white mx-4 pb-2">利用方法</p>
            </div>
            <div className="row-span-1 ">
              <p onClick={loginClick} className="text-white border border-gray-500 mx-4 py-2 rounded-xl bg-gradient-to-br from-gray-600 to-gray-500 text-center shadow-md">ログイン</p>
            </div>
            <p className=" ml-4 mb-2 row-span-1 flex flex-col justify-end text-white">ID:{id1}-{id2}-{id3}</p>
          </div>
          {/* ログインボタンが押された時の処理 */}
          {isLoginOpen &&
            <div className="col-span-1 grid grid-rows-10">
              <div className="row-span-2 flex flex-col justify-center">
                <p className="text-white text-center">ログイン画面</p>
              </div>
              <div className="row-span-7 ">
                <form method="POST" onSubmit={loginSubmit} className=" h-full">
                  <div className="flex flex-col justify-evenly h-full">
                    <div className="flex justify-evenly">
                      <input name="id1" required type="text" placeholder="1234" ref={id1Ref} className="w-1/5 mx-1 bg-gray-500 text-white text-center rounded-xl py-2" />
                      <p className="text-white my-auto">-</p>
                      <input name="id2" required type="text" placeholder="567" ref={id2Ref} className="w-1/5 mx-1 bg-gray-500 text-white text-center rounded-xl py-2" />
                      <p className="text-white my-auto">-</p>
                      <input name="id3" required type="text" placeholder="890" ref={id3Ref} className="w-1/5 mx-1 bg-gray-500 text-white text-center rounded-xl py-2" />
                    </div>
                    {/* <input type="text" placeholder="ユーザーID" className="w-4/5 mx-auto bg-gray-500 text-white text-center rounded-xl py-2" /> */}
                    <input name="pass" required type="password" placeholder="パスワード" ref={passwordRef} className="w-4/5 mx-auto bg-gray-500 text-white text-center rounded-xl py-2" />
                    <button type="submit" className=" w-4/5 mx-auto bg-gradient-to-br from-emerald-600 to-emerald-400 text-white rounded-xl shadow-md py-2">保存</button>
                  </div>
                </form>
              </div>
              <div className="row-span-1 flex  justify-end">
                <svg onClick={() => setIsLoginOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-2 text-white w-8 h-8">
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>}
          {/* 利用方法ボタンが押された時の処理 */}
          {
            isWayOpen &&
            <div className="col-span-1 grid grid-rows-10">
              <div className="row-span-1 flex flex-col justify-center">
                <p className="text-white text-center font-bold">利用方法</p>
              </div>
              <div className="row-span-8 flex flex-col justify-between">
                <p className="text-white mx-4 text-xs">1.ログイン画面でユーザーIDとパスワードを入力して保存ボタンを押してください</p>
                <p className="text-white mx-4 text-xs">2.更新ボタンを押してデータを取得してください(何度か更新しないと取得されない場合があります！)</p>
                <p className="text-white mx-4 text-xs">3.データを取得すると、スコア一覧とハイスコアのグラフが表示されます</p>
                <p className="text-white mx-4 text-xs">4.スコア一覧をクリックすると詳細な情報が得られます</p>
                <p className="text-white mx-4 text-xs ">*「ハイスコア」をタップすると他のグラフに切り替わります</p>
              </div>
              <div className="row-span-1 flex  justify-end">
                <svg onClick={() => setIsWayOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-2 text-white w-8 h-8">
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          }

        </motion.div>
      </motion.div>
    </div>
  )
}

export default MenuModal;
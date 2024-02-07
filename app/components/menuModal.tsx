"use client"
import { MouseEvent } from "react"
import { MouseEventHandler } from "react"
import { motion } from "framer-motion"
type MenuModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
const MenuModal = ({ isOpen, setIsOpen }: MenuModalProps) => {
  //モダールがオープンされているかの確認
  if (!isOpen) return null;

  const hundleModalClick = (e: MouseEvent) => {
    //親要素への伝搬を防ぐ
    e.stopPropagation();
  }

  const hundleBackClick = (e: MouseEvent) => {
    //親要素への伝搬を防ぐ
    e.stopPropagation();
    setIsOpen(false);
  }
  return (
    <div className="fixed z-50 inset-2 overflow-y-auto h-4/5 "
      onClick={hundleBackClick}>
      <div className="fixed inset-0 bg-black opacity-65  transition-opacity"></div>

      <motion.div className="fixed h-4/5 w-1/2 right-0 top-10 bg-black opacity-85 shadow-xl transform transition-all "
        onClick={hundleModalClick}
        initial={{ x: "300%" }}
        animate={{ x: 0 }}
        transition={{ duration: "0.03" }}>
        {/* ここからがmodalの中身 */}
        <p className="text-center mt-4 text-white">メニュー</p>
      </motion.div>
    </div>
  )
}

export default MenuModal;
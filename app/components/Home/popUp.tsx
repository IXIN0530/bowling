import { motion } from "framer-motion";
type Props = {
  touchX: number,
  touchY: number,
  text: string,
  mode: string,
}
const PopUp = ({ touchX, touchY, text, mode }: Props) => {
  // alert(touchX);
  if (mode == "here") {
    return (
      <motion.div
        className="fixed w-3/4 bg-white border-2 border-black rounded-xl flex flex-row justify-center"
        initial={{ scale: 1, opacity: 0, x: window.innerWidth / 8, y: touchY - 60 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, times: [0, 0.05, 0.95, 1] }}>
        <p className="text-center my-auto">{text}</p>
      </motion.div>
    )
  }
  else if (mode == "normal") {
    return (
      <motion.div
        className="absolute inset-3 p-2 bg-white border-2 border-black rounded-xl flex flex-row justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, times: [0, 0.05, 0.95, 1] }}>
        <p className="text-center my-auto ">{text}</p>
      </motion.div>
    )
  }
}

export default PopUp;

type Props = {
  isWaitTimeOpen: boolean
  setIsWaitTimeOpen: (isWayOpen: boolean) => void
}
const WaitTime = ({ isWaitTimeOpen, setIsWaitTimeOpen }: Props) => {
  return (
    <div className="col-span-1 grid grid-rows-10">
      <div className="row-span-9">
        
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
"use client"
import { Chart, Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, CategoryScale, ChartOptions } from 'chart.js';
type Props = {
  displayData: number[] | string[],
  days: string[] | number[] | undefined,
}
ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale);
const DisplayChart = ({ displayData, days }: Props) => {

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.3)',
          tickWidth: 1,
          lineWidth: 1,
        },
      },
    },
    responsive: false,
  }

  return (
    <>
      <div className=" border border-none bg-default-bg h-full flex flex-col justify-center w-full items-center" >
        <Line className=" "
          data={{
            labels: days as number[],
            datasets: [
              {
                data: displayData,
                borderColor: 'rgba(0,180,180,0.7)',
                pointBackgroundColor: 'rgba(255,0,0,1)',
                pointBorderWidth: 0,
                borderWidth: 2
              },
            ],
          }}
          options={options}
        />
      </div>
    </>
  )
}

export default DisplayChart;
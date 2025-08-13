import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const FuelCostChart = ({ data }) => {
  const chartData = {
    labels: ["Base Cost", "Traffic Surcharge", "Distance Premium"],
    datasets: [
      {
        data: data?.breakdown || [70, 20, 10],
        backgroundColor: ["#22c55e", "#f59e0b", "#ef4444"],
        borderColor: ["#16a34a", "#d97706", "#dc2626"],
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Fuel Cost Breakdown",
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Doughnut data={chartData} options={options} />
    </div>
  )
}

export default FuelCostChart

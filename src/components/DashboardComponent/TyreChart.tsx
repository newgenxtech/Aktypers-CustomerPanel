import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const barData = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [
    {
      label: "Replaced",
      data: [5, 8, 10],
      backgroundColor: "#8884d8",
    },
    {
      label: "Maintained",
      data: [10, 15, 20],
      backgroundColor: "#82ca9d",
    },
  ],
};

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Tyre Maintenance Trends",
    },
  },
};


export const TyreChart: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-[50vh] transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          {" "}
          Maintenance Trends
        </h2>
        <Bar width={100} height={100} data={barData} options={barOptions} />
      </div>

    </div>
  );
};

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.75)",
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: "circle",
          font: { family: "Inter, system-ui, -apple-system, Segoe UI, Roboto", size: 11, weight: "600" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(2, 6, 23, 0.92)",
        titleColor: "rgba(255,255,255,0.92)",
        bodyColor: "rgba(255,255,255,0.82)",
        borderColor: "rgba(255,255,255,0.16)",
        borderWidth: 1,
      },
    },
    cutout: "68%",
  };

  return <Doughnut data={data} options={options} />;
}

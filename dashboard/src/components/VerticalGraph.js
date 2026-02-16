import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "rgba(255,255,255,0.75)",
        font: { family: "Inter, system-ui, -apple-system, Segoe UI, Roboto", weight: "700" },
        usePointStyle: true,
        pointStyle: "rectRounded",
      },
    },
    title: {
      display: true,
      text: "Holdings",
      color: "rgba(255,255,255,0.88)",
      font: { family: "Inter, system-ui, -apple-system, Segoe UI, Roboto", size: 14, weight: "800" },
    },
    tooltip: {
      backgroundColor: "rgba(2, 6, 23, 0.92)",
      titleColor: "rgba(255,255,255,0.92)",
      bodyColor: "rgba(255,255,255,0.82)",
      borderColor: "rgba(255,255,255,0.16)",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: { color: "rgba(255,255,255,0.65)", font: { size: 11, weight: "600" } },
      grid: { color: "rgba(255,255,255,0.06)" },
    },
    y: {
      ticks: { color: "rgba(255,255,255,0.55)", font: { size: 11, weight: "600" } },
      grid: { color: "rgba(255,255,255,0.06)" },
    },
  },
};

export function VerticalGraph({ data }) {
  return (
    <div style={{ height: 320 }}>
      <Bar options={options} data={data} />
    </div>
  );
}

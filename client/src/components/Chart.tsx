// components/ScoreLineChart.tsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Animation,
} from "chart.js";
import { useMemo } from "react";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const data = [
  { name: "Math", score: 85, age: 17 },
  { name: "English", score: 67, age: 90 },
  { name: "Biology", score: 92, age: 22 },
  { name: "History", score: 13, age: 30 },
  { name: "Physics", score: 88, age: 4 },
  { name: "Chemistry", score: 9, age: 80 },
];

const ScoreLineChart = () => {
  // Get CSS variables dynamically
  const primaryColor =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-primary"
    ) || "#3b82f6";

  const secondaryColor =
    getComputedStyle(document.documentElement).getPropertyValue(
      "--color-secondary"
    ) || "#3b82f6";

  const chartData = useMemo(
    () => ({
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: "Scores",
          data: data.map((d) => d.score),
          borderColor: primaryColor.trim(),
          backgroundColor: `${primaryColor.trim()}33`, // 20% opacity
          //fill: true,
          tension: 0.4,
          borderWidth: 0.6,
          // pointWidth: 0.6,
          pointBackgroundColor: primaryColor.trim(),
          // pointBorderColor: primaryColor.trim(),
        },
        {
          label: "Age",
          data: data.map((d) => d.age),
          borderColor: secondaryColor,
          backgroundColor: `${secondaryColor}33`,
          tension: 0.4,
          borderWidth: 0.6,
          // fill: false,
          pointBackgroundColor: secondaryColor,
          // pointBorderColor: secondaryColor,
        },
      ],
    }),
    [primaryColor]
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    Animation,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Student Scores",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="card card-border bg-base-100">
      <div className="card-body">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ScoreLineChart;

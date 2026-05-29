import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function StatsChart({ sales, topProducts }) {

  // ================= SALES CHART =================

  const salesData = {

    labels: sales.map((s) => s.day),

    datasets: [
      {
        label: "Ventes FC",

        data: sales.map((s) => s.total),

        backgroundColor: "#0b132b"
      }
    ]
  };

  // ================= PRODUCTS CHART =================

  const productsData = {

    labels: topProducts.map((p) => p.name),

    datasets: [
      {
        label: "Produits",

        data: topProducts.map((p) => p.total_sold),

        backgroundColor: [
          "#0b132b",
          "#1c2541",
          "#3a506b",
          "#5bc0be",
          "#6fffe9"
        ]
      }
    ]
  };

  return (

    <div className="charts-container">

      {/* ================= SALES ================= */}

      <div className="chart-box">

        <h2>Ventes par jour</h2>

        <Bar data={salesData} />

      </div>

      {/* ================= PRODUCTS ================= */}

      <div className="chart-box">

        <h2>Meilleurs Produits</h2>

        <Doughnut data={productsData} />

      </div>

    </div>
  );
}

export default StatsChart;
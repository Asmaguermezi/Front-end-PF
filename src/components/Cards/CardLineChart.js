import React from "react";
import Chart from "chart.js";

export default function CardLineChart() {
  React.useEffect(() => {
    const config = {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Étudiants",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: "Enseignants",
            backgroundColor: "#10B981",
            borderColor: "#10B981",
            data: [28, 48, 40, 19, 36, 55, 40],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            fontColor: "#A0AEC0",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#A0AEC0",
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "#A0AEC0",
              },
              gridLines: {
                color: "rgba(160, 174, 192, 0.2)",
                zeroLineColor: "rgba(160, 174, 192, 0.2)",
              },
            },
          ],
        },
      },
    };
    const ctx = document.getElementById("etudia-line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white">
      <div className="rounded-t px-4 py-3 border-b border-blueGray-200 bg-white">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Statistiques
            </h6>
            <h2 className="text-blueGray-700 text-xl font-bold">
              Inscriptions mensuelles
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative w-full" style={{ height: "600px" }}>
          <canvas id="etudia-line-chart"></canvas>
        </div>
      </div>
    </div>
  );
}

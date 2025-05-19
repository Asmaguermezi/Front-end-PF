import React from "react";
import Chart from "chart.js";

export default function CardBarChart() {
  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"
        ],
        datasets: [
          {
            label: "Sessions créées",
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [5, 12, 8, 20, 15, 9, 25], // ➕ Tes vraies données ici
            fill: false,
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              color: "rgba(33, 37, 41, 0.1)",
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              color: "rgba(33, 37, 41, 0.1)",
            },
          }],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    new Chart(ctx, config);
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Activité de la plateforme
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Sessions d’étude par mois
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

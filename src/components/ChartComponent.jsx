import React from "react";
import styles from "./ChartComponent.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent() {
  let data = [
    {
      label: "Label 1",
      value: 55,
      color: "#3B82F6",
      cutout: "70%",
    },
    {
      label: "Label 2",
      value: 15,
      color: "#909090",
      cutout: "70%",
    },
  ];

  const options = {
    // plugins: {
    //   responsive: true,
    // },
    cutout: data.map((item) => item.cutout),
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => Math.round(item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        // borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };

  return (
    <>
      <div className={styles.leftChart}>
        <Doughnut data={finalData} options={options} />
      </div>
      <div className={styles.rightChart}>
        <span>Completion rate</span>
        <span>33%</span>
      </div>
    </>
  );
}

export default ChartComponent;

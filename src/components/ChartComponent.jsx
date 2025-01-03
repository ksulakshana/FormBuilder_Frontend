import React, { useState, useEffect } from "react";
import styles from "./ChartComponent.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartComponent(viewCount, startCount, submitCount) {
  const [vc, setVC] = useState(0);
  const [sc, setSC] = useState(0);
  let data = [
    {
      label: "Start Count",
      value: 50,
      color: "#3B82F6",
      cutout: "70%",
    },
    {
      label: "Submitted Count",
      value: 15,
      color: "#909090",
      cutout: "70%",
    },
  ];

  const options = {
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
  useEffect(() => {
    setSC(viewCount.startCount);
    const percentage = (viewCount.submitCount / viewCount.startCount) * 100;
    setVC(Math.round(percentage));
  }, [sc]);

  return (
    <>
      <div className={styles.leftChart}>
        {sc && <Doughnut data={finalData} options={options} />}
      </div>
      <div className={styles.rightChart}>
        <span>Completion rate</span>
        <span>{vc}%</span>
      </div>
    </>
  );
}

export default ChartComponent;

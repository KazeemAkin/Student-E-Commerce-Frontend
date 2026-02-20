import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);
const Barchart = ({ data }) => {
  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 8,
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              tickBorderDash: [8, 4],
            },
            ticks: {
              color: "black",
              font: {
                size: 8,
              },
            },
          },
          y: {
            ticks: {
              color: "black",
              font: {
                size: 8,
              },
            },
          },
        },
      }}
    />
  );
};

export default Barchart;

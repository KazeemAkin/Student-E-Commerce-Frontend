import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import colors from "../../../config/colors";

Chart?.register(...registerables);

const DoughnutChart = ({
  doughnutData,
  label1 = "Male",
  label2 = "Female",
  label3 = null,
  label4 = null
}) => {
  const data = {
    labels: [
      `${label1}(` + doughnutData[0] + ")",
      `${label2}(` + doughnutData[1] + ")",
    ],
    datasets: [
      {
        data: doughnutData,
        backgroundColor: [colors.primary, colors.orange],
        borderWidth: 1,
      },
    ],
  };
  if (label3) {
    data.labels.push(`${label3}(` + doughnutData[2] + ")");
    data.datasets[0].backgroundColor.push(colors.mainSecondary)
  }
  if (label4) {
    data.labels.push(`${label4}(` + doughnutData[3] + ")");
    data.datasets[0].backgroundColor.push(colors.success)
  }
  return (
    <Doughnut
      data={data}
      options={{
        plugins: {
          legend: {
            display: true,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;

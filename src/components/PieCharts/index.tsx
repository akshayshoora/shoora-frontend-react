import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Distracted Driving", 11],
  ["Harsh Braking", 59],
  ["Speed Limit Violation", 12],
  ["Tailgating", 12],
  ["Harsh Acceleration", 17],
  ["Harsh Cornering", 25],
  ["Stop Sign Violation", 17],
  ["Forward Collision Warning", 23],
];

export const options = {
  title: "Incident Summary",
  is3D: true,
  series: { 8: { type: "line" } },
  legend: { position: "bottom" },
};

function PieCharts() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
export default PieCharts;

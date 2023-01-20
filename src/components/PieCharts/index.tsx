import { Chart } from "react-google-charts";

// export const data = [
//   ["Task", "Hours per Day"],
//   ["Distracted Driving", 11],
//   ["Harsh Braking", 59],
//   ["Speed Limit Violation", 12],
//   ["Tailgating", 12],
//   ["Harsh Acceleration", 17],
//   ["Harsh Cornering", 25],
//   ["Stop Sign Violation", 17],
//   ["Forward Collision Warning", 23],
// ];
export const data = [
  ["Task", "Hours per Day"],
  ["Forward Collision Warning", 3.44],
  ["Lane Deviation Warning", 16.95],
  ["Car Close Distance Warning", 30.41],
  ["Pedestrian Detection Warning", 0.61],
  ["Fatigue Warning", 25.04],
  ["Mobile Phone Use Warning", 14.35],
  ["Smoking Warning", 2.29],
  ["Distracted Driving Warning", 4.01],
 ["Face Not detected Warning", 2.87],
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

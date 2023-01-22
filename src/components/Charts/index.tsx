import { Chart } from "react-google-charts";

// export const data = [
//   [
//     "Distracted Driving",
//     "Harsh Acceleration",
//     "Harsh Braking",
//     "Harsh Cornering",
//     "Speed Limit Violation",
//     "Stop Sign Violation",
//     "Tailgating",
//   ],
//   ["2022/23", 165, 938, 522, 998, 450, 614.6],
//   ["2005/06", 135, 1120, 599, 1268, 288, 682],
// ];

export const data = [
  [
    "Monthly",
    "Forward Collision Warning",
    "Lane Deviation Warning",
    "Car Close Distance Warning",
    "Pedestrian Detection Warning",
    "Fatigue Warning",
    "Mobile Phone Use Warning",
    "Smoking Warning",
    "Distracted Driving Warning",
    "Face Not detected Warning",
  ],
  ["2022/23", 206, 560, 867, 10, 753, 433, 73, 39, 14],
  ["2023/24", 283, 1850, 1046, 78, 2807, 1607, 253, 531, 394],
];

export const options = {
  title: "Incident Trend",
  vAxis: { title: "No. of Incidents / 100 Kilometers" },
  hAxis: { title: "Time" },
  seriesType: "bars",
  series: { 9: { type: "line" } },
  legend: { position: "bottom" },
};

function Charts() {
  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
export default Charts;

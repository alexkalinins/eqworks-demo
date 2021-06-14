import React from "react";
import { Line } from "react-chartjs-2";
import { firstCapital } from "../util/PrettyText";

/**
 * CSS colors for displaying the lines
 */
const colors = [
  "darkorange",
  "deepskyblue",
  "chartreuse", // <-- because lineCHART.
  "hotpink",
  "salmon",
  "fuchsia",
  "rebeccapurple",
  "springgreen",
  "teal",
  "blue",
];

/**
 * A wrapper for react-chartjs-2 multi-line chart. If 10 or less data features are
 * displayed, each will have a unique color, after that the default color is black.
 *
 * rawData is the array of data entry objects. selectedKeys is an array of names
 * of the keys that should be displayed in the chart. xAxisKey is the name of the x axis key.
 *
 * @returns
 */
export default function LineChart({ rawData, selectedKeys, xAxisKey }) {
  const [data, setData] = React.useState(null);
  const [options, setOptions] = React.useState(null);

  // updating the graph if data or selected keys change.
  React.useEffect(() => {
    console.log("selected keys", selectedKeys);

    //make dataset from raw data

    const dataset = selectedKeys.map((key, index) => {
      // defaulting to black if ran out of colors.
      let color = index < colors.length ? colors[index] : "black";

      return {
        label: firstCapital(key),
        data: rawData.map((d) => d[key]),
        backgroundColor: color,
        borderColor: color,
        yAxisID: `${key}-yaxis`,
      };
    });

    const newData = {
      // the dates are the xaxis labels
      labels: rawData.map((d) => d[xAxisKey]),
      datasets: dataset,
    };

    setData(newData);

    const newOptions = {
      responsive: true,
      scales: {
        yAxes: selectedKeys.map((key) => {
          return {
            type: "linear",
            display: true,
            id: `${key}-yaxis`,
            gridLines: {
              drawOnArea: false,
            },
          };
        }),
        xAxes: [
          {
            type: "time",
            display: true,
            scaleLabel: { display: true, labelString: firstCapital(xAxisKey) },
          },
        ],
      },
    };

    console.log(newOptions);
    setOptions(newOptions);
  }, [rawData, selectedKeys, xAxisKey]);

  return (
    <div>
      {data && options && selectedKeys.length > 0 && (
        <Line data={data} options={options} />
      )}
    </div>
  );
}

import React from "react";
import LineChart from "./LineChart";
import { firstCapital } from "../util/PrettyText";

/**
 * Displays a line chart of data, where xAxisKey is the key of the variable used as the
 * x-axis. The react componet contains a row of buttons representing the features of the
 * data, toggling that feature on the line chart when pressed.
 *
 * If the feature selection buttons should not be displayed, defaultSelected could be passed
 * as an array of the names of key that are displayed as default.
 * @returns react component
 */
export default function DataGrapher({ data, xAxisKey, defaultSelected }) {
  const [selectedKeys, setSelectedKeys] = React.useState([]);

  React.useEffect(() => {
    setSelectedKeys(defaultSelected ? defaultSelected : []);
  }, [data]);

  return (
    <div>
      {data && (
        <div className="visualizer">
          <h2>Graph:</h2>

          {!defaultSelected && (
            <div className="button-bar">
              {Object.keys(data[0])
                // does not allow 'date' or 'hour' to be compared.
                .filter((key) => key != "date" && key != "hour")
                .map((key) => (
                  <button
                    className={selectedKeys.includes(key) ? "selected" : ""}
                    key={`${key}-select-button`}
                    onClick={() => {
                      if (selectedKeys.includes(key)) {
                        console.log(`deselecting ${key}`);

                        //deselect this key
                        setSelectedKeys(
                          selectedKeys.filter((aKey) => aKey != key)
                        );
                      } else {
                        //select this key
                        console.log(`selecting ${key}`);
                        selectedKeys.push(key);
                        setSelectedKeys([...selectedKeys]);
                      }
                    }}
                  >
                    {firstCapital(key)}
                  </button>
                ))}
            </div>
          )}

          {selectedKeys.length == 0 && (
            <span className="subtitle">Select a parameter to see graph</span>
          )}
          <LineChart
            rawData={data}
            selectedKeys={selectedKeys}
            xAxisKey={xAxisKey}
          />
        </div>
      )}
    </div>
  );
}

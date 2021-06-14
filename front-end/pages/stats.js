import React from "react";
import Table from "../components/Table";
import axios from "axios";
import NavBar from "../components/NavBar";

import DataGrapher from "../components/DataGrapher";

/**
 * The webpage displaying the 'stats' endpoints of the API. User can toggle between hourly and daily statistics.
 * Shows the stats on a table and allows them to be compared on a graph.
 * @returns react component
 */
export default function stats() {
  //true if hourly stats
  const [displayHourly, setDisplayHourly] = React.useState(true);

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `/api/stats/${displayHourly ? "hourly" : "daily"}`,
      timeout: 4000,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 429)
          alert(
            "The API is rate limited. Please try again later (in ~5 seconds)."
          );
      });
  }, [displayHourly]);

  return (
    <main>
      <NavBar />
      <h1>{displayHourly ? "Hourly " : "Daily "} Statistics</h1>
      <button onClick={() => setDisplayHourly(!displayHourly)}>
        Show {!displayHourly ? "Hourly" : "Daily"}
      </button>

      <DataGrapher data={data} xAxisKey={displayHourly ? "hour" : "date"} />

      <h2>Table</h2>
      <span className="subtitle">
        Click on a parameter to search the table.
      </span>
      {data && <Table data={data} />}
    </main>
  );
}

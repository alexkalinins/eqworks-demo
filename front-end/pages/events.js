import React from "react";
import Table from "../components/Table";
import axios from "axios";
import NavBar from "../components/NavBar";
import DataGrapher from "../components/DataGrapher";

/**
 * The 'events' webpage displaying the 'events' endpoints from the API. Shows a table and line chart of the events.
 * Can be toggled by the user to display hourly or daily events.
 * @returns react component
 */
export default function events() {
  const [displayHourly, setDisplayHourly] = React.useState(true);

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `/api/events/${displayHourly ? "hourly" : "daily"}`,
      timeout: 4000,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(
          "The API is rate limited. Please try again later (in ~5 seconds)."
        );
      });
  }, [displayHourly]);

  return (
    <main>
      <NavBar />
      <h1>{displayHourly ? "Hourly " : "Daily "} Events</h1>
      <button onClick={() => setDisplayHourly(!displayHourly)}>
        Show {!displayHourly ? "Hourly" : "Daily"}
      </button>

      <DataGrapher defaultSelected={["events"]} xAxisKey="hour" data={data} />

      <h2>Table</h2>
      {data && <Table data={data} />}
    </main>
  );
}

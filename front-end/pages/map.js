import axios from "axios";
import React from "react";
import NavBar from "../components/NavBar";
import Table from "../components/Table";
import Map from "../components/Map";

/**
 * 'Points of Interest' page displaying the 'poi' endpoint of the API. Shows a 
 * table of points of interests and a map.
 * @returns react component
 */
export default function poi() {
  const [data, setData] = React.useState(null);
  const [center, setCenter] = React.useState([43.645609, -79.380803]);

  React.useEffect(() => {
    axios({
      method: "GET",
      url: `/api/poi`,
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
  }, []);

  /**
   * Call to change the center of the map to focus on a poi.
   */
  const focusOnPoi = (poi) => {
    setCenter([poi.lat, poi.lon]);
  };

  return (
    <main>
      <NavBar />
      <h1>Points of Interest</h1>
      {data && <Map data={data} location={center} />}
      Select a point of interest in the table below to see its location on the
      map.
      <h2>Table</h2>
      {data && <Table data={data} rowClickCallback={focusOnPoi} />}
    </main>
  );
}

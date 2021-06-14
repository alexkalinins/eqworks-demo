import React from "react";
import { Map, Marker } from "pigeon-maps";
import { v4 as uuid } from "uuid";

/**
 * A wrapper for the pigeon maps map. Data is the raw data object of points of interest
 * (where each entry has a lat (latitude) and lon (longitute)).
 * @returns react component
 */
export default function MapWrapper({ data, location}) {
  const [center, setCenter] = React.useState(location);
  const [zoom, setZoom] = React.useState(8);

  React.useEffect(()=>{
      setCenter(location);
  }, [location]);

  return (
    <div>
      <Map
        height={300}
        center={center}
        defaultZoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        {data.map((poi) => (
          <Marker width={50} anchor={[poi.lat, poi.lon]} key={uuid()} />
        ))}
      </Map>
    </div>
  );
}

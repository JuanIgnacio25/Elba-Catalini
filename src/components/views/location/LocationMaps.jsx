"use client"
import "./location.css"

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function LocationMap () {
  const mapContainerStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width: '90%',
    height: '60vh',
  };

  const center = {
    lat: -32.81501732588858,
    lng: -61.38952872593572,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationMap;
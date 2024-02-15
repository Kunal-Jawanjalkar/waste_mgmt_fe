"use client";
import React, { useState } from "react";
import { useMapEvents } from "react-leaflet";

const MapMouseCoordinates = () => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const map = useMapEvents({
    mousemove: (e) => {
      setPosition(e.latlng);
    },
  });
  return (
    <div
      className="fixed z-[999] top-2 left-[50%]"
      style={{ textShadow: "0 0 10px #fff" }}
    >
      Lat: {position.lat.toFixed(3)}, Long: {position.lng.toFixed(3)}
    </div>
  );
};

export default MapMouseCoordinates;

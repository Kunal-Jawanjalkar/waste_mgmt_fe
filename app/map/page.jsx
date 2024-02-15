"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const MapPage = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/custom/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  const markerPositions = [
    {
      tooltipContent: "Industrail waste Collection - Khadki, Pune",
      position: [18.567, 73.85],
    },
    {
      tooltipContent: "Medical waste collection - Ahmednagar",
      position: [19.093, 74.743],
    },
    {
      tooltipContent: "Domestic waste collection - Nashik",
      position: [20.015, 73.743],
    },
    {
      tooltipContent: "E-waste collection - Nagpur",
      position: [21.150, 79.143],
    },
  ];

  return (
    <Map
      zoom={6}
      position={markerPositions[0].position}
      markerPositions={markerPositions}
    />
  );
};

export default MapPage;

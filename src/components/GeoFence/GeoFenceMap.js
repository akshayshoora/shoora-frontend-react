import {
  Circle,
  DrawingManager,
  GoogleMap,
  LoadScript,
  Polygon,
} from "@react-google-maps/api";
import React, { useState } from "react";

const libraries = ["drawing", "places"];

const GeoFenceMap = ({ polyAxis, type, center, circleRadius }) => {
  const onLoad = (drawingManager) => {
    console.log(drawingManager);
  };

  console.log(typeof circleRadius, "radiusss");
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: true,
    editable: true,
    visible: true,
    zIndex: 1,
  };

  const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ];

  const onPolygonComplete = (polygon) => {
    console.log(polygon.getPath().getArray());
    const polyAxiss = polygon.getPath().getArray();
    let tempArr = [];
    for (let i in polyAxiss) {
      tempArr.push({ lat: polyAxiss[i].lat(), lng: polyAxiss[i].lng() });
    }
    polyAxis(tempArr);
  };

  const onCircleComplete = (circle) => {
    console.log(circle.radius);
  };
  return (
    <>
      <h2>Map view</h2>

      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={{
            height: "calc(100vh - 260px)",
            width: "100%",
          }}
          center={center}
          zoom={12}
        >
          {type == "polygon" ? (
            <DrawingManager
              style={{ display: "none" }}
              onLoad={onLoad}
              onPolygonComplete={onPolygonComplete}
              drawingMode={"polygon"}
              onCircleComplete={onCircleComplete}
              editable
              draggable
            />
          ) : (
            <Circle
              // optional
              onLoad={onLoad}
              // optional
              // onUnmount={onUnmount}
              center={center}
              // required
              radius={circleRadius ? circleRadius : ""}
              options={options}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default React.memo(GeoFenceMap);

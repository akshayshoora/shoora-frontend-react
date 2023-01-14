import {
  Circle,
  DrawingManager,
  GoogleMap,
  LoadScript,
  Polygon,
} from "@react-google-maps/api";
import React, { useState } from "react";

const libraries = ["drawing", "places"];

const GeoFenceMap = (props) => {
  const { polyAxis, type, center, setCenter, circleRadius, setLat, setLng } =
    props;
  const onLoad = (drawingManager) => {};

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

  const handleClickedMap = (e) => {
    let latitude = e.latLng.lat();
    let longtitude = e.latLng.lng();
    setCenter({ lat: latitude, lng: longtitude });
    setLat(latitude);
    setLng(longtitude);
  };
  return (
    <>
      <h2>Map view</h2>

      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
        libraries={libraries}
      >
        <GoogleMap
          onClick={handleClickedMap}
          mapContainerStyle={{
            height: "calc(100vh - 260px)",
            width: "100%",
          }}
          center={center}
          zoom={12}
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
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

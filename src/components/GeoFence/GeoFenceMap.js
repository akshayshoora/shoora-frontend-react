import {
  Circle,
  DrawingManager,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";

const libraries = ["drawing", "places"];

const GeoFenceMap = ({ polyAxis, type }) => {
  const onLoad = (drawingManager) => {
    console.log(drawingManager);
  };
  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3000,
    zIndex: 1,
  };

  const onPolygonComplete = (polygon) => {
    console.log(polygon.getPath().getArray());
    const polyAxiss = polygon.getPath().getArray();
    let tempArr = [];
    for (let i in polyAxiss) {
      tempArr.push({ lat: polyAxiss[i].lat(), lng: polyAxiss[i].lng() });
      //   console.log(polyAxiss[i].lat());
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
            height: "400px",
            width: "500px",
          }}
          center={{ lat: 20.5937, lng: 78.9629 }}
          zoom={10}
        >
          {type == "polygon" ? (
            <DrawingManager
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
              // required
              editable
              draggable
              center={{ lat: 20.5937, lng: 78.9629 }}
              // required
              radius={20}
              // options={options}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default React.memo(GeoFenceMap);

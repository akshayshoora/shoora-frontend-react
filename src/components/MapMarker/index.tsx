import { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import vehicleImage from "../../assets/truck.png";
import ReactDOMServer from 'react-dom/server';
import { latLongToPlace, sanitizeURL } from "utils/helpers";
import Marker from "./InfoWindow";
interface IMapTestProps {
  list: any[];
  zoomDeviceId: any;
}

export default function MapMarker(props: IMapTestProps) {
  const { list } = props;

  const MapRef: any = useRef(null);
  const MapBounds: any = useRef(null);
  const Clusterer: any = useRef(null);
  const Markers: any = useRef([]);

  useEffect(() => {
    if (props.zoomDeviceId && Array.isArray(list)) {
      const {
        current_location
      } = Array.isArray(list) && list.find(item => item.device === props.zoomDeviceId) || {},
        { latitude, longitude } = current_location || {};
      MapRef.current.setCenter(new google.maps.LatLng(+latitude, +longitude));
      MapRef.current.setZoom(10);

      const clickMarkersElem: any = Markers.current.find((item: any) => item.id === props.zoomDeviceId);
      if (clickMarkersElem) {
        google.maps.event.trigger(clickMarkersElem, 'click');
      }
    }
  }, [props.zoomDeviceId, list]);

  useEffect(() => {
    if (Array.isArray(list)) {
      const loader = new Loader({
        apiKey: `${process.env.REACT_APP_MAP_KEY}`,
        version: "weekly",
        libraries: ["places"],
      });

      loader.load().then(() => {
        // Map Initialization
        MapRef.current = new (window as any).google.maps.Map(
          document.getElementById("map"),
          {
            center: { lat: 20.5937, lng: 78.9629 },
            zoom: 4,
          }
        );

        const infoWindow = new (window as any).google.maps.InfoWindow({});
        // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Add some markers to the map.

        MapBounds.current = new (window as any).google.maps.LatLngBounds();

        Markers.current = list.map((vehicleDetails: any, index: number) => {
          const { current_location } = vehicleDetails;
          const position = new (window as any).google.maps.LatLng(
            parseFloat(current_location?.latitude),
            parseFloat(current_location?.longitude)
          );
          // const label = labels[index % labels.length];

          MapBounds.current.extend(position);
          MapRef.current.fitBounds(MapBounds.current);

          const marker = new (window as any).google.maps.Marker({
            position,
            id: vehicleDetails?.device,
            // label,
            icon: vehicleImage,
          });


          marker.addListener("click", async () => {
            let address = await latLongToPlace(current_location?.latitude, current_location?.longitude, false);
            infoWindow.setContent(ReactDOMServer.renderToString(<Marker
              vehicleInfo={vehicleDetails}
              address={address}
            />));
            infoWindow.open(MapRef, marker);
          });

          return marker;
        });

        Clusterer.current = new MarkerClusterer({
          markers: Markers.current,
          map: MapRef.current,
        });
      });
    }
  }, [list]);

  return (
    <div>
      <div id="map" style={{ height: "573px" }}></div>
    </div>
  );
}

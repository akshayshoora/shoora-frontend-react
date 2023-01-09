import { useRef, useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import vehicleImage from "../../assets/truck.png";

interface IMapTestProps {
  list: any[];
}

export default function MapMarker(props: IMapTestProps) {
  const { list } = props;

  const MapRef: any = useRef(null);
  const MapBounds: any = useRef(null);
  const Clusterer: any = useRef(null);
  const Markers: any = useRef([]);

  useEffect(() => {
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

      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: "",
        disableAutoPan: true,
      });
      // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      // Add some markers to the map.

      MapBounds.current = new (window as any).google.maps.LatLngBounds();

      Markers.current = list.map((loc: any, index: number) => {
        const position = new (window as any).google.maps.LatLng(
          parseFloat(loc.lat),
          parseFloat(loc.lng)
        );
        // const label = labels[index % labels.length];

        MapBounds.current.extend(position);
        MapRef.current.fitBounds(MapBounds.current);

        const marker = new (window as any).google.maps.Marker({
          position,
          // label,
          icon: vehicleImage,
        });

        marker.addListener("click", () => {
          infoWindow.setContent(loc.lat);
          infoWindow.open(MapRef, marker);
        });

        return marker;
      });

      Clusterer.current = new MarkerClusterer({
        markers: Markers.current,
        map: MapRef.current,
      });
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ height: "573px" }}></div>
    </div>
  );
}

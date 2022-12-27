//https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=AIzaSyDv0VwXjXpb0Ob88D2ZI5pj5gO0HaGZTx4
import client from "serverCommunication/client";
import axios from "axios";
export function latLongToPlace(lat: number, long: number) {
  return new Promise((resolve: any) => {
    const APIkey = process.env.REACT_APP_MAP_KEY;
    const URL =
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=` +
      APIkey;

    axios
      .get(URL)
      .then(function (response) {
        // console.log("response--", response.data.results[0].formatted_address);
        console.log(JSON.stringify(response.data));
        resolve(response.data.results[0].formatted_address);
      })
      .catch(function (error) {
        console.log(error);
        resolve(error);
      });
  });
}

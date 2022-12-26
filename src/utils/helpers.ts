//https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&key=AIzaSyDv0VwXjXpb0Ob88D2ZI5pj5gO0HaGZTx4
import client from "serverCommunication/client";
import axios from "axios";
export async function latLongToPlace(lat: number, long: number){
    const APIkey = process.env.REACT_APP_MAP_KEY;
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=`+APIkey;
    console.log('URL--',URL)
    const response: any = await axios.get(URL);
    console.log('response--', response.data.results[0].formatted_address)
     return response.data.results[0].formatted_address;
}
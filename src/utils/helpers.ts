import client from "serverCommunication/client";
import axios from "axios";
export async function latLongToPlace(
  lat: number,
  long: number,
  shortName: boolean
) {
  return new Promise((resolve: any) => {
    const APIkey = process.env.REACT_APP_MAP_KEY;
    const URL =
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=` +
      APIkey;

    axios
      .get(URL)
      .then(function (response) {
        if (shortName) {
          resolve(
            response.data.results[0].address_components[1]?.long_name
              ? response.data.results[0].address_components[1].long_name
              : response.data.results[0].address_components[0].long_name
          );
        } else {
          let address = response.data.results[0].formatted_address;
          let splitAddress: any = address.split(" ");
          if (splitAddress[0].indexOf("+")) {
            splitAddress.splice(0, 1);
            address = splitAddress.join(" ")
          }
          resolve(address)
          // resolve(response.data.results[0].formatted_address);
        }
      })
      .catch(function (error) {
        console.log(error);
        resolve(error);
      });
  });
}

export function getUserRoles(roles: any) {
  let role = "";
  if (Array.isArray(roles)) {
    for (let i = 0; i < roles.length; i++) {
      role = role + roles[i].display_name + (roles.length - 1 != i ? "|" : "");
    }
  }
  return role;
}

export function sanitizeURL(incomingURL: string) {
  let paramArray = incomingURL.split("?");
  let returnURL = paramArray[0] + "?";
  paramArray = paramArray[1].split("&");
  for (let i = 0; i < paramArray.length; i++) {
    if (paramArray[i].split("=")[1] !== "") {
      returnURL += paramArray[i] + "&";
    }
  }
  if (returnURL.slice(-1) == "&") {
    returnURL = returnURL.slice(0, -1);
  }
  return returnURL;
}

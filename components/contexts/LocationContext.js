import React, { useState, useContext, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

const GPSContext = React.createContext();
// The contexts and the providers are for creating data that can be
// shared through the rest of the components
export function useGPS() {
  return useContext(GPSContext);
}
export function GPSProvider({ children }) {
  const [GPSLocation, setGPSLocation] = useState();
  const [coordinateList, setCoordinateList] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

  // This is done in useEffect so its done once only, not each render.
  // only when component is mounted.
  useEffect(() => {
    setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({});
      setGPSLocation(location);
      setCoordinateList(
        coordinateList.push({
          lat: location["coords"]["latitude"],
          long: location["coords"]["longitude"],
        })
      );

      if (coordinateList.length == 5) {
        console.log(coordinateList);

        const apiResult = await axios.post(
          "https://gasup-362104.uc.r.appspot.com/api/mapBox",
          coordinateList
        );
        console.log(apiResult);
      }
    }, 500);

    (async () => {
      console.log("requesting permission");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const value = {
    GPSLocation,
  };
  return <GPSContext.Provider value={value}>{children}</GPSContext.Provider>;
}

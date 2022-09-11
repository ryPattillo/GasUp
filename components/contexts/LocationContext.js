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
  const [totalDistance, setTotalDistance] = useState(0.0);

  const coordinates = [
    { lat: -117.17282, long: 32.71204 },
    { lat: -117.17288, long: 32.71225 },
    { lat: -117.17293, long: 32.71244 },
    { lat: -117.17292, long: 32.71256 },
    { lat: -117.17298, long: 32.712603 },
    { lat: -117.17314, long: 32.71259 },
    { lat: -117.17334, long: 32.71254 },
  ];

  // This is done in useEffect so its done once only, not each render.
  // only when component is mounted.
  useEffect(() => {
    setInterval(async () => {
      let location = await Location.getCurrentPositionAsync({});
      setGPSLocation(location);
    
      if (coordinateList.length % 20 == 0) {
        try {
          //console.log(coordinates);
          //   const apiResult = await axios.post(
          //     "https://gasup-362104.uc.r.appspot.com/api/mapBox",
          //     coordinates
          //   );
          //   console.log(apiResult.data["miles"]);
        } catch (error) {
          console.log("Error: " + error);
        }
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

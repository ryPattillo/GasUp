import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  StatusBar,
  Dimensions,
  Container,
  TouchableOpacity,
  Pressable,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Stack, HStack, VStack } from "react-native-flex-layout";
import { useAuth } from "../contexts/AuthContext";
import Drawer from "react-native-drawer";
import { useGPS } from "../contexts/LocationContext";
export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const { GPSLocation } = useGPS();
  const firestore = firebase.firestore();
  const [drawerRightOpen, setDrawerRightOpen] = useState(false);
  const [inSession, setInSession] = useState(false);
  const observer = useRef(null);
  const inviteListener = useRef(null);
  const timeout = useRef(null);

  async function handleStop() {
    try {
      console.log("handle end");
      clearInterval(timeout.current);
      setInSession(false);
      if (observer.current !== null) {
        observer.current();
      } else {
        console.log("could not clear observer");
      }
    } catch (error) {}
  }
  async function handleGo() {
    try {
      console.log(GPSLocation);
      await firestore.collection("sessions").doc(currentUser.uid).set({
        driver: currentUser.email,
        coordinates: GPSLocation,
        rideStart: firestore.FieldValue.serverTimestamp(),
      });
      // Just posted the new doc to the 'searching' collection.
      console.log("DOC CREATED");
      setInSession(true);
      // observer.current = firestore
      //   .collection("searching")
      //   .where(firebase.firestore.FieldPath.documentId(), "==", currentUser.uid)
      //   .onSnapshot((docSnapshot) => {
      //     docSnapshot.docChanges().forEach((change) => {
      //       if (change.type === "added") {
      //         console.log("added a doc");
      //       } else {
      //         console.log("something else");
      //       }
      //     });
      //   });
      clearInterval(timeout.current);
      timeout.current = setInterval(() => {
        console.log("interval ran, publish coords.");
        firestore
          .collection("sessions")
          .doc(currentUser.uid)
          .update({ coordinates: GPSLocation })
          .then((res) => console.log(res))
          .catch((err) => {
            console.log(err);
          });
      }, 10000);
    } catch (error) {
      setInSession(false);
      console.log(error);
    }
  }
  useEffect(() => {
    // Redirects user if not logged in.
    if (!currentUser) {
      navigation.navigate("Login");
    }
    return () => {
      handleStop();
    };
  }, []);
  return (
    <Drawer
      type="static"
      openDrawerOffset={100}
      styles={{
        drawer: {
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 3,
        },
        main: { paddingLeft: 3 },
      }}
      tapToClose={true}
      tweenHandler={Drawer.tweenPresets.parallax}
      open={drawerRightOpen}
      onClose={() => {
        setDrawerRightOpen(false);
      }}
      side={"right"}
      content={
        <View>
          <Text>test</Text>
        </View>
      }
    >
      <View style={styles.mainContainer}>
        {/* Top Nav */}
        <View style={styles.topNav}>
          <HStack>
            <TouchableOpacity>
              <Ionicons name="menu-outline" size={32} style={styles.iconLeft} />
            </TouchableOpacity>

            <Text style={styles.logoText}>GasUp</Text>

            <Image
              style={styles.Logo}
              source={require("../../assets/images/dragonLogo.png")}
            />

            <TouchableOpacity>
              <Ionicons
                name="person-circle"
                size={32}
                onPress={() => {
                  console.log("set");

                  setDrawerRightOpen(drawerRightOpen ? false : true);
                }}
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </HStack>
        </View>

        {/* Map View */}
        <View>
          <MapView
            showsUserLocation={inSession}
            followsUserLocation={inSession}
            style={styles.map}
          />
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          <Ionicons name="search" size={32} style={styles.searchButton} />
        </View>
        <TouchableOpacity
          style={inSession ? styles.stopButton : styles.goButton}
          onPress={() => {
            if (inSession) {
              handleStop();
            } else {
              handleGo();
            }
          }}
        >
          <Text style={{ color: "white" }}>{inSession ? "STOP" : "GO"}</Text>
        </TouchableOpacity>
      </View>
    </Drawer>
  );
}

// COMPONENT STYLES
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    borderBottomColor: "#2F6424",
  },
  Logo: {
    width: 30,
    height: 30,
    flexDirection: "row",
    marginRight: 45,
    float: "left",
    marginTop: 8,
  },
  map: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get('window').height,
    height: 423,
  },
  topNav: {
    marginTop: 40,
  },
  logoText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 45,
    // flexDirection: 'row',
    color: "#2F6424",
    // position: "absolute",
  },
  iconRight: {
    color: "#2F6424",
    justifyContent: "right",
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 78,
  },
  iconLeft: {
    color: "#2F6424",
    justifyContent: "left",
    alignItems: "flex-start",
    width: 30,
    height: 30,
    marginLeft: -105,
  },
  searchButton: {
    color: "#2F6424",
    justifyContent: "flex-end",
    marginRight: 327,
    marginTop: 1,
    // borderTopColor:"red",
  },
  goButton: {
    position: "absolute",
    backgroundColor: "#2F6424",
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 300,
    left: Dimensions.get("window").width / 2 - 37,
  },
  stopButton: {
    position: "absolute",
    backgroundColor: "red",
    width: 75,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 300,
    left: Dimensions.get("window").width / 2 - 37,
  },
});

import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Overlay,
} from "react-native";
import firebase from "firebase/app";
import "firebase/auth";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack } from "react-native-flex-layout";
import { useAuth } from "../contexts/AuthContext";
import Drawer from "react-native-drawer";
import { useGPS } from "../contexts/LocationContext";
import axios from "axios";

const COORDINATES = [
  { lat: -117.17282, long: 32.71204 },
  { lat: -117.17288, long: 32.71225 },
  { lat: -117.17293, long: 32.71244 },
  { lat: -117.17292, long: 32.71256 },
  { lat: -117.17298, long: 32.712603 },
  { lat: -117.17314, long: 32.71259 },
  { lat: -117.17334, long: 32.71254 },
];

export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const { GPSLocation } = useGPS();
  const [coordinateList, setCoordinateList] = useState(new Array());

  const firestore = firebase.firestore();
  const [drawerBottomOpen, setDrawerBottomOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [inSession, setInSession] = useState(false);
  const totalDistance = useRef(0);

  const [modalVisible, setModalVisible] = useState(false);
  const observer = useRef(null);
  const inviteListener = useRef(null);
  const timeout = useRef(null);

  async function handleStop() {
    try {
      clearInterval(timeout.current);
      setInSession(false);
      if (observer.current !== null) {
        observer.current();
      } else {
        console.log("could not clear observer");
      }
      await axios.post("https://gasup-362104.uc.r.appspot.com/api/endDrive", {
        session_id: currentUser.email,
        total_miles: totalDistance.current,
      });
    } catch (error) {}
  }

  async function handleGo() {
    try {
      console.log("location", GPSLocation);
      await firestore.collection("sessions").doc(currentUser.email).set({
        driver: currentUser.email,
        coordinates: GPSLocation,
        riders: [],
        cost: 0,
      });
      // Just posted the new doc to the 'searching' collection.
      setInSession(true);
      clearInterval(timeout.current);

      timeout.current = setInterval(async () => {
        // Add to the coordinates
        let coordinateListCopy = coordinateList;
        setCoordinateList(
          coordinateListCopy.push({
            lat: GPSLocation["coords"]["latitude"],
            long: GPSLocation["coords"]["longitude"],
          })
        );
        //Simulate how it will actually work instead use head coded cooordinates
        if (coordinateList.length % 10 == 0) {
          try {
            console.log(COORDINATES);
            const apiResult = await axios.post(
              "https://gasup-362104.uc.r.appspot.com/api/mapBox",
              COORDINATES
            );
            console.log(apiResult.data["miles"]);
            totalDistance.current =
              totalDistance.current + apiResult.data["miles"];
            console.log("Total ", totalDistance);
          } catch (error) {
            console.log("Error: " + error);
          }
        }

        firestore
          .collection("sessions")
          .doc(currentUser.email)
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

  function getFriends() {
    console.log("get friends.");
    axios
      .post("https://gasup-362104.uc.r.appspot.com/api/getFriends", {
        email: currentUser.email,
      })
      .then((res) => {
        if (res && res.data) {
          console.log(res.data);
          setFriends(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // Redirects user if not logged in.
    if (!currentUser) {
      navigation.navigate("Login");
    } else {
      getFriends();

      console.log(currentUser.email);
      inviteListener.current = firestore
        .collection("invites")
        .where(
          firebase.firestore.FieldPath.documentId(),
          "==",
          currentUser.email
        )
        .onSnapshot((docSnapshot) => {
          docSnapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              setModalVisible(true);
              console.log(change.type);
              console.log("added a doc. SOMEONE INVITED ME ! ");
            } else {
              console.log("something else");
            }
          });
        });
    }

    return () => {
      inviteListener.current();
      handleStop();
    };
  }, []);

  return (
    <Drawer
      type="static"
      openDrawerOffset={367}
      onCloseStart={() => {
        setDrawerBottomOpen(false);
      }}
      styles={{
        drawer: {
          shadowColor: "#727272",
          shadowOpacity: 0.8,
          shadowRadius: 3,
          backgroundColor: "#727272",
          marginTop: 40,
          flex: 1,
        },
        main: { paddingBottom: 3 },
      }}
      tapToClose={false}
      tweenHandler={Drawer.tweenPresets.parallax}
      open={drawerBottomOpen}
      side={"bottom"}
      content={
        <View style={styles.drawerOpen}>
          <Text style={styles.addText}>Recommended Riders</Text>
          <ScrollView
            persistentScrollbar={true}
            horizontal="true"
            style={styles.scrollWindow}
          >
            <HStack>
              {friends &&
                friends.map((friend, i) => {
                  return (
                    <VStack key={i}>
                      <TouchableOpacity
                        style={styles.friendsButton}
                        onPress={() => {
                          {
                            axios.post(
                              "https://gasup-362104.uc.r.appspot.com/api/inviteFriend",
                              {
                                friend_email: friend.email,
                                session: currentUser.email,
                              }
                            );
                          }
                        }}
                      >
                        <Text style={styles.logoLetter}>
                          {friend.name
                            ? friend.name.toUpperCase().charAt(0)
                            : "Error"}
                        </Text>
                      </TouchableOpacity>
                      <Text style={styles.names}>{friend.name}</Text>
                    </VStack>
                  );
                })}

              <VStack>
                <TouchableOpacity
                  onPress={() => {
                    setDrawerBottomOpen(false);
                    navigation.navigate("Search");
                  }}
                  style={styles.addButton}
                >
                  <Ionicons
                    name="add-outline"
                    size={32}
                    style={styles.addIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.names}>Add new</Text>
              </VStack>
            </HStack>
          </ScrollView>

          <View style={styles.ridingBox}>
            <Text style={styles.currText}>Current Riders</Text>
          </View>

          <ScrollView
            persistentScrollbar={true}
            horizontal="true"
            style={styles.scrollWindow}
          >
            <HStack>
              <VStack>
                <TouchableOpacity
                  style={styles.friendsButton}
                  onPress={getFriends}
                >
                  <Text style={styles.logoLetter}>J</Text>
                </TouchableOpacity>
                <Text style={styles.names}>Jason</Text>
              </VStack>
            </HStack>
          </ScrollView>
        </View>
      }
    >
      <View style={styles.mainContainer}>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Ride invite </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    const res = await axios.post(
                      "https://gasup-362104.uc.r.appspot.com/api/acceptInvite",
                      {
                        email: currentUser.email,
                      }
                    );
                    if (res && res.data) {
                      console.log(res.data);
                    }
                    observer.current = firestore
                      .collection("sessions")
                      .where(
                        firebase.firestore.FieldPath.documentId(),
                        "==",
                        res.data.session
                      )
                      .onSnapshot((docSnapshot) => {
                        docSnapshot.docChanges().forEach((change) => {
                          if (change.type === "removed") {
                            // end of session
                            handleStop();
                          } else {
                            console.log("something else");
                          }
                        });
                      });
                    setInSession(true);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Accept Invite</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={async () => {
                    await firestore
                      .collection("invites")
                      .doc(currentUser.email)
                      .delete();

                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Decline Invite</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        {/* Top Nav */}
        <View style={styles.topNav}>
          <HStack>
            <Text style={styles.logoText}>GasUp</Text>
            <Image
              style={styles.Logo}
              source={require("../../assets/images/dragonLogo.png")}
            />
            <TouchableOpacity>
              <Ionicons
                onPress={() => {
                  console.log("set");
                  navigation.navigate("Profile");
                }}
                name="person-circle"
                size={32}
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

        {!drawerBottomOpen && (
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
            <Text style={styles.goText}>{inSession ? "STOP" : "GO"}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.drawerUp}>
          <Ionicons
            onPress={() => {
              getFriends();
              setDrawerBottomOpen(drawerBottomOpen ? false : true);
            }}
            name={
              drawerBottomOpen ? "chevron-down-outline" : "chevron-up-outline"
            }
            size={32}
            style={styles.chevronDown}
          />
        </View>
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
  },
  Logo: {
    width: 35,
    height: 35,
    flexDirection: "row",
    marginRight: 45,
    float: "left",
    marginTop: 2,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
    // height: 750,
  },
  topNav: {
    marginTop: 10,
    // borderBottomWidth: 2,
    // borderBottomColor: "#2F6424",
    marginBottom: 15,
  },
  logoText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 45,
    // flexDirection: 'row',
    color: "#2F6424",
    fontWeight: "bold",
    // position: "absolute",
  },
  iconRight: {
    color: "#2F6424",
    justifyContent: "right",
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 78,
    marginTop: 5,
  },
  infoBox: {
    color: "#2F6424",
    justifyContent: "right",
    width: 50,
    height: 50,
    position: "absolute",
    marginLeft: 100,
  },
  iconLeft: {
    color: "#2F6424",
    justifyContent: "left",
    alignItems: "flex-start",
    width: 30,
    height: 30,
    marginLeft: -105,
    marginTop: 5,
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
    bottom: 150,
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
    bottom: 150,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  addText: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "left",
    color: "black",
    marginTop: 3,
    marginLeft: 10,
    // paddingBottom: 5,
  },
  currText: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "left",
    color: "black",
    // marginTop: 10,
    marginLeft: 10,
  },
  drawerOpen: {
    color: "#2F6424",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 350,
    backgroundColor: "#828282",
  },
  drawerUp: {
    paddingBottom: 15,
    backgroundColor: "#5F5F5F",
    width: Dimensions.get("window").width,
    // justifyContent: "center",
    // position: "relative",
    // alignContent: "center",
    // alignSelf: "center",
  },
  friendsButton: {
    height: 80,
    width: 80,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 10,
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#78B293",
  },
  scrollWindow: {
    width: 650,
    height: 250,
    backgroundColor: "#5F5F5F",
    width: Dimensions.get("window").width,
  },
  addButton: {
    height: 80,
    width: 80,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#828282",
  },
  addIcon: {
    color: "#78B293",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    fontWeight: "extra-bold",
  },
  logoLetter: {
    fontWeight: "extra-bold",
    fontSize: 65,
    color: "white",
    marginLeft: 14,
  },
  names: {
    color: "white",
    fontSize: 20,
    position: "relative",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
    fontWeight: "regular",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  rideInfo: {
    position: "relative",
    alignSelf: "left",
    backgroundColor: "purple",
  },
  ridingBox: {
    width: Dimensions.get("window").width,
    height: 25,
    backgroundColor: "#828282",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },
  chevronDown: {
    justifyContent: "center",
    alignSelf: "center",
  },
});

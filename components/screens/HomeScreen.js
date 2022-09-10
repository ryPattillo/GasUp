import React, { useEffect, useState } from "react";
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
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Stack, HStack, VStack } from "react-native-flex-layout";
import { useAuth } from "../contexts/AuthContext";
import Drawer from "react-native-drawer";
export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [drawerRightOpen, setDrawerRightOpen] = useState(false);
  //   useEffect(() => {
  //     // Redirects user if not logged in.
  //     if (!currentUser) {
  //       navigation.navigate("Login");
  //     }
  //   }, []);
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
          <MapView style={styles.map} />
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          <Ionicons name="search" size={32} style={styles.searchButton} />
        </View>
        <TouchableOpacity style={styles.goButton}>
          <Text style={styles.goText}>{"GO"}</Text>
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
    height: Dimensions.get('window').height,
    // height: 550,
    borderTopColor: "#2F6424",
    borderTopWidth: 10,
  },
  topNav: {
    marginTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#2F6424',
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
    bottom: 50,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    color: "white",
  },
});

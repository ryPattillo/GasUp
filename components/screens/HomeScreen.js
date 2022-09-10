import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Stack, HStack, VStack } from "react-native-flex-layout";
import { useAuth } from "../contexts/AuthContext";
import Drawer from "react-native-drawer";

export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [drawerBottomOpen, setDrawerBottomOpen] = useState(false);
  //   useEffect(() => {
  //     // Redirects user if not logged in.
  //     if (!currentUser) {
  //       navigation.navigate("Login");
  //     }
  //   }, []);
  return (
    <Drawer
      type="static"
      openDrawerOffset={370}
        onCloseStart={() => {
            setDrawerBottomOpen(false);
        }}
      styles={{
        drawer: {
            shadowColor: "#red",
            shadowOpacity: 0.8,
            shadowRadius: 3, 
              backgroundColor: "#D9D9D9",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },
          main: { paddingBottom: 3 },
      }}
      tapToClose={true}
      tweenHandler={Drawer.tweenPresets.parallax}
      open={drawerBottomOpen}
      side={"bottom"}
      content={
        <View style={styles.drawerOpen}>
            <Text style={styles.addText}>Add to Ride</Text>
            <ScrollView horizontal="true">
                  <Text style={fontSize= 42}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                  </Text>
            </ScrollView>
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
                style={styles.iconRight}/>
            </TouchableOpacity>
          </HStack>
        </View>

        {/* Map View */}
        <View>
          <MapView style={styles.map} />
        </View>

        {/* Bottom Drawer */}
        {
            drawerBottomOpen == true ? 
            <TouchableOpacity style={styles.goButton}>
                <Text style={styles.goText}>{"GO"}</Text>
            </TouchableOpacity> 
            :         
            <TouchableOpacity onPress={() => {setDrawerBottomOpen(drawerBottomOpen ? false : true);}}>
                <Ionicons name="chevron-up-outline" size={32}  style={styles.drawerUp}/>
            </TouchableOpacity>
        }
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
    height: 725,
    borderBottomColor: "#2F6424",
    borderBottomWidth: 10,
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
    bottom: 75,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    color: "white",
  },
  addText: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "left",
    color: "black",
    marginTop: 10,
    marginLeft: 10,
  },
  drawerOpen: {
    color: "#2F6424",
    justifyContent: "center",
    alignItems: "center", 
    marginBottom: 400,
  },
  drawerUp: {
    paddingBottom: 15,
  },
});

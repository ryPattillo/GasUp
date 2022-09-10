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

export default function HomeScreen({ navigation }) {
  const { currentUser } = useAuth();
  useEffect(() => {
    // Redirects user if not logged in.
    if (!currentUser) {
      navigation.navigate("Login");
    }
  }, []);
  return (
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
            <Ionicons name="person-circle" size={32} style={styles.iconRight} />
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
});

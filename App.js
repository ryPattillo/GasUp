import { initializeApp } from "firebase/app";
import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import RegistrationScreen from "./components/screens/registerScreen/registrationScreen";
import { AuthProvider } from "./components/contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import HomeScreen from "./components/screens/loginScreen/LoginScreen";
import LoginScreen from "./components/screens/loginScreen/LoginScreen";

export default function App() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        {/* <MapView style={styles.map} /> */}
        <LoginScreen />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

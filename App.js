import { initializeApp } from "firebase/app";
import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { AuthProvider } from "./components/contexts/AuthContext";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import HomeScreen from "./components/screens/HomeScreen";
import LoginScreen from "./components/screens/loginScreen/LoginScreen";
import RegistrationScreen from "./components/screens/registerScreen/registrationScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GPSProvider } from "./components/contexts/LocationContext";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <GPSProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false, gestureEnabled: false }}
            />
          </Stack.Navigator>
        </GPSProvider>
      </AuthProvider>
    </NavigationContainer>
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

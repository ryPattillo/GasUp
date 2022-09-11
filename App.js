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
import ProfileScreen from "./components/screens/profileScreen/ProfileScreen";
import { GPSProvider } from "./components/contexts/LocationContext";
import AddCarScreen from "./components/screens/addCarScreen/AddCarScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <ProfileScreen></ProfileScreen>
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegistrationScreen}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Garage"
            component={AddCarScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
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

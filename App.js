import { initializeApp } from 'firebase/app';
import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import HomeScreen from './components/screens/HomeScreen'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} /> */}
      <RegistrationScreen></RegistrationScreen>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
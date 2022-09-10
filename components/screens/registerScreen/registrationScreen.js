
import { View, Text, ScrollView , StyleSheet, TextInput, SafeAreaView, useWindowDimensions} from "react-native";
import React, {useState} from 'react';
import Input from "../../Input";
import { Button } from "@react-native-material/core";

export default function RegistrationScreen(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
 
  return(

    <View style={styles.root}>
      <Text style={styles.title}>Create a Account</Text>
      <Input placeholder={"First Name"} value={username} setValue={setUsername}></Input>
      <Input placeholder={"Last Name"}></Input>
      <Input placeholder={"Password"} value={password} setValue={setPassword} secureTextEntry={"true"}></Input>
      <Button variant="contained"color="black">Contained</Button>
    </View>

  )
}

const styles = StyleSheet.create({

  root: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 200,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'Black',
  },
})


import { View, Text, ScrollView , StyleSheet, TextInput, SafeAreaView, useWindowDimensions} from "react-native";
import React, {useState} from 'react';
import Input from "../../Input";
import { Button } from "@react-native-material/core";

const Separator = () => (
  <View style={styles.separator} />
);

export default function RegistrationScreen(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {height} = useWindowDimensions();
 
  return(

    <View style={styles.root}>
      <View style={{flexDirection:"row"}}>
        <Text style={styles.title}>GasUp</Text>
      </View>
  
      <Text style={styles.title}>Create a Account</Text>
      <Input placeholder={"First Name"} value={username} setValue={setUsername}></Input>
      <Input placeholder={"Last Name"}></Input>
      <Input placeholder={"Password"} value={password} setValue={setPassword} secureTextEntry={"true"}></Input>
      <Button variant="contained"color="black" style={styles.button} title="SIGN UP">Contained</Button>
      <Separator/>
      <Text style={styles.text}>Already have an account? Click here to sign in.</Text>
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
    marginLeft: 15,
    marginTop: 200,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 24,
    color: 'Black',
  },
  button:{
    marginLeft:12,
    marginRight:12,
    marginTop:20
  },
  separator: {
    marginLeft: 9,
    marginRight: 9,
    marginTop: 15,
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text:{
    marginLeft: 12
  }
})

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  SafeAreaView,
  useWindowDimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Input from "../../Input";
import { Button } from "@react-native-material/core";
import { HStack } from "@react-native-material/core";
import { useAuth } from "../../contexts/AuthContext";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Separator = () => <View style={styles.separator} />;

export default function RegistrationScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup, logout } = useAuth();

  async function registerUser() {
    try {
      if (firstname === "") {
        Alert.alert("Enter a first name!");
      } else if (lastname === "") {
        Alert.alert("Enter a last name!");
      } else if (password === "") {
        Alert.alert("Enter a password");
      } else {
        const result = await signup(email, password);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: "100%" }}
      keyboardShouldPersistTaps="never"
      scrollEnabled={true}
    >
      <View style={styles.root}>
        <HStack
          mt={-75}
          ml={-20}
          spacing={0}
          style={{ justifyContent: "center", borderStyle: "solid" }}
        >
          <Text style={styles.logoText}>GasUp</Text>
          <Image
            source={require("../../../assets/images/dragonLogo.png")}
            style={styles.logoImage}
          />
        </HStack>

        <Text style={styles.title}>Create a Account</Text>
        <Input
          placeholder={"First Name"}
          value={firstname}
          setValue={setFirstname}
        ></Input>
        <Input
          placeholder={"Last Name"}
          value={lastname}
          setValue={setLastname}
        ></Input>
        <Input placeholder={"Email"} value={email} setValue={setEmail}></Input>
        <Input
          placeholder={"Password"}
          value={password}
          setValue={setPassword}
          secureTextEntry={"true"}
        ></Input>
        <Button
          variant="contained"
          color="black"
          style={styles.button}
          title="SIGN UP"
          onPress={registerUser}
        ></Button>
        <Button
          variant="contained"
          color="black"
          style={styles.button}
          title="redirect "
          onPress={() => {
            navigation.navigate("Home");
          }}
        ></Button>
        <Separator />
        <Text style={styles.text}>
          Already have an account? Click here to sign in.
        </Text>
      </View>
    </KeyboardAwareScrollView>
    // </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
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
    marginTop: 55,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 30,
    color: "Black",
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
  },
  separator: {
    marginLeft: 9,
    marginRight: 9,
    marginTop: 15,
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    marginLeft: 12,
  },
  logoText: {
    marginLeft: 15,
    marginTop: 200,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 60,
    color: "Black",
  },
  logoImage: {
    marginLeft: 0,
    marginTop: 200,
    marginBottom: 10,
    width: 60,
    height: 60,
  },
  container: {
    flex: 1,
  },
});

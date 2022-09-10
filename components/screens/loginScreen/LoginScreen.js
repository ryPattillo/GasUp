import {
  View,
  Text,
  StyleSheet,
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

export default function LoginScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signup, login } = useAuth();

  async function loginUser() {
    try {
      if (email === "") {
        Alert.alert("Enter a email!");
      } else if (password === "") {
        Alert.alert("Enter a passoword!");
      } else {
        const result = await login(email, password);
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
          title="LOGIN"
          onPress={loginUser}
        ></Button>

        <Button
          variant="contained"
          color="black"
          style={styles.button}
          title="SIGN UP"
        ></Button>
        <Separator />
        <Text style={styles.text}>Forgot your password? Click Here.</Text>
      </View>
    </KeyboardAwareScrollView>
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

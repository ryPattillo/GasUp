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
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Separator = () => <View style={styles.separator} />;

export default function RegistrationScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, logout } = useAuth();
  const [loginError, setLoginError] = useState();

  async function registerUser() {
    setLoading(true);
    try {
      if (firstname === "") {
        Alert.alert("Enter a first name!");
        return setLoading(false);
      } else if (lastname === "") {
        Alert.alert("Enter a last name!");
        return setLoading(false);
      } else if (password === "") {
        Alert.alert("Enter a password");
        return setLoading(false);
      } else {
        const result = await signup(email, password);
        const data = {
          firstName: firstname,
          lastName: lastname,
          email: email,
        };
        const apiResult = await axios.post(
          "https://gasup-362104.uc.r.appspot.com/api/signUp",
          data
        );
        setLoading(false);
        console.log(apiResult);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
      setLoginError(error);
      setLoading(false);
    }

    // if (loginError) {
    //   Alert.alert(loginError);
    // }
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

        <Text style={styles.title}>Create an Account</Text>
        {loginError && (
          <Text style={{ color: "red", marginLeft: 15 }}>
            {JSON.stringify(loginError.message)}
          </Text>
        )}
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
          disabled={loading}
          variant="contained"
          color="#2F6424"
          style={styles.button}
          title="SIGN UP"
          onPress={registerUser}
        ></Button>
        {/* <Button
          disabled={loading}
          variant="contained"
          color="#2F6424"
          style={styles.button}
          title="go home (DELETE ME)"
          onPress={() => {
            navigation.navigate("Home");
          }}
        ></Button> */}
        <Separator />
        <Text
          style={styles.text}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
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
    color: "#2F6424",
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 20,
    color: "#2F6424",
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
    color: "#2F6424",
  },
  logoText: {
    marginLeft: 15,
    marginTop: 200,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 60,
    color: "#2F6424",
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

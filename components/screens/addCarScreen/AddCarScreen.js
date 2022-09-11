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
import axios from "axios";

const Separator = () => <View style={styles.separator} />;

export default function AddCarScreen({ navigation }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const { currentUser } = useAuth();

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
        <Text style={styles.title}>Enter Car Information</Text>
        <Input placeholder={"MAKE"} value={make} setValue={setMake}></Input>
        <Input placeholder={"MODEL"} value={model} setValue={setModel}></Input>
        <Input placeholder={"YEAR"} value={year} setValue={setYear}></Input>

        <Button
          variant="contained"
          color="black"
          style={styles.button}
          title="FINISH"
          onPress={() => {
            axios
              .post("https://gasup-362104.uc.r.appspot.com/api/findCar", {
                make: make,
                model: model,
                year: year,
                email: currentUser.email,
              })
              .then((res) => {
                let re = res["data"];
                console.log(re);
                axios.post("https://gasup-362104.uc.r.appspot.com/api/addCar", {
                  re,
                });
              })
              .catch((error) => {
                console.log(error);
              });
            navigation.navigate("Profile");
          }}
        ></Button>
        <Button
          variant="contained"
          color="#2F6424"
          style={styles.button}
          title="CANCEL"
          onPress={() => {
            navigation.navigate("Profile");
          }}
        ></Button>
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

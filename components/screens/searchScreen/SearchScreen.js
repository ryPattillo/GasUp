import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HStack, VStack } from "react-native-flex-layout";
import Input from "../../Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import firebase from "firebase/app";
import "firebase/auth";

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const firestore = firebase.firestore();
  const [results, setResults] = useState([]);
  // async function searchUser() {
  //     setLoading(true);
  //     try {

  //     } catch (error) {
  //         console.log(error);
  //         setLoading(false);
  //     }
  // }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topNav}>
        <HStack>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back-outline"
              size={32}
              style={styles.iconLeft}
              onPress={() => {
                navigation.navigate("Home");
              }}
            />
          </TouchableOpacity>

          <Text style={styles.logoText}>GasUp</Text>

          <Image
            style={styles.Logo}
            source={require("../../../assets/images/dragonLogo.png")}
          />
        </HStack>
      </View>
      {/* <VStack>

                </VStack> */}
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="never"
        scrollEnabled={true}
      >
        <Input
          placeholder={"Search for a name..."}
          value={search}
          setValue={setSearch}
          onSubmitEditing={async () => {
            console.log("submitted");
            firestore
              .collection("users")
              .where("email", ">=", search.toLowerCase())
              .where("email", "<=", search.toLowerCase() + "\uf8ff")
              .get()
              .then((querySnapshot) => {
                let results_ = [];
                querySnapshot.forEach((doc) => {
                  results_.push(doc.data());
                });
                console.log(results_);
                setResults(results_);
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          }}
        ></Input>
        <View style={styles.userList}>
          {results &&
            results.map((e) => {
              JSON.stringify(e);
            })}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    borderBottomColor: "#2F6424",
  },
  backIcon: {
    color: "black",
    height: 30,
    width: 30,
    // marginRight: 1,
  },
  topNav: {
    marginTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#2F6424",
  },
  Logo: {
    width: 30,
    height: 30,
    flexDirection: "row",
    marginRight: 45,
    float: "left",
    marginTop: 8,
  },
  logoText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 45,
    // flexDirection: 'row',
    color: "#2F6424",
    fontWeight: "bold",
    // position: "absolute",
    marginLeft: 70,
  },
  iconRight: {
    color: "#2F6424",
    justifyContent: "right",
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 78,
  },
  iconLeft: {
    color: "#2F6424",
    justifyContent: "left",
    alignItems: "flex-start",
    width: 30,
    height: 30,
    marginLeft: -50,
    marginTop: 5,
  },
  userList: {},
  userBox: {
    backgroundColor: "green",
  },
});

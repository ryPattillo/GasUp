import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Input from "../../Input";
import { Button } from "@react-native-material/core";
import { HStack } from "@react-native-material/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

export default function ProfileScreen({ navigation }) {
  const { currentUser } = useAuth();
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const { signup, logout } = useAuth();

  useEffect(() => {
    axios
      .post("https://gasup-362104.uc.r.appspot.com/api/getTransaction", {
        email: currentUser.email,
      })
      .then((res) => {
        if (res) {
          setTransaction(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {};
  }, []);

  async function logoutUser() {
    setLoading(true);
    try {
      const result = await logout();
      const data = {
        loggedIn: "false",
      };
      // const apiResult = await axios.post(
      //   "https://gasup-362104.uc.r.appspot.com/api/signUp",
      //   data
      // );
      setLoading(false);
      // console.log(apiResult);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <View style={styles.topNav}>
          <HStack>
            <TouchableOpacity>
              <Ionicons
                name="arrow-back"
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

            <TouchableOpacity>
              <Ionicons
                size={32}
                style={styles.iconRight}
                name="power"
                onPress={logoutUser}
              />
            </TouchableOpacity>
          </HStack>
        </View>
        <Avatar
          size={80}
          style={styles.avatar}
          icon={(props) => <Icon name="account" {...props} />}
        />
        <Text style={styles.usersName}>
          {currentUser ? currentUser.email : "No user loggedin"}
        </Text>
        {/* <Button
          style={styles.editButton}
          title="Edit"
          trailing={(props) => <Icon name="pencil" {...props} />}
        /> */}
        <Text style={styles.balance}>$0.00</Text>
        <Text style={styles.balanceLabel}>Gasup balance</Text>
        <Divider
          style={{
            marginTop: 20,
            marginBottom: -30,
            width: 500,
            borderBottomWidth: 0.5,
          }}
          leadingInset={0}
        />
        <Image
          style={styles.carModel}
          source={require("../../../assets/images/hondaAccord.png")}
        />
        <Text style={styles.carInfo}>Car</Text>
        <Icon
          name="wrench"
          size={20}
          color="#2F6424"
          style={{ marginRight: -70, marginTop: -22 }}
          onPress={() => {
            navigation.navigate("Garage");
          }}
        />
        <Divider
          style={{
            marginTop: 20,
            marginBottom: -30,
            width: 500,
            borderBottomWidth: 0.5,
          }}
          leadingInset={0}
        />
        <Text style={styles.title}>Transaction History</Text>
        {transaction &&
          transaction.map((element) => {
            return (
              <View style={styles.item}>
                <Text style={styles.itemContent}>Driver: {element.driver}</Text>
                <Text style={styles.itemContent}>Cost: {element.cost}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: "100%",
    borderBottomColor: "#2F6424",
  },
  container: {
    flex: 1,
  },
  avatar: {
    marginLeft: -220,
    marginTop: 20,
    backgroundColor: "#2F6424",
  },
  usersName: {
    fontSize: 25,
    marginLeft: 100,
    marginTop: -65,
    fontWeight: "bold",
  },
  usersEmail: {
    fontSize: 15,
    marginLeft: 12,
    marginTop: 0,
  },
  editButton: {
    padding: 0,
    width: 140,
    height: 30,
    marginLeft: 130,
    marginTop: 5,
    justifyContent: "center",
    backgroundColor: "#2F6424",
  },
  logOutButton: { marginTop: -30, marginBottom: 30, marginLeft: 300 },
  topNav: {
    marginTop: 40,
    borderBottomColor: "#2F6424",
  },
  item: {
    backgroundColor: "lightgrey",
    borderColor: "black",
    borderStyle: "solid",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 350,
  },
  itemContent: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Logo: {
    width: 35,
    height: 35,
    flexDirection: "row",
    marginRight: 45,
    float: "left",
    marginTop: 2,
  },
  logoText: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 45,
    // flexDirection: 'row',
    color: "#2F6424",
    fontWeight: "bold",
    // position: "absolute",
  },
  iconRight: {
    color: "#2F6424",
    justifyContent: "right",
    width: 30,
    height: 30,
    position: "absolute",
    marginLeft: 65,
    color: "red",
  },
  iconLeft: {
    color: "#2F6424",
    justifyContent: "left",
    alignItems: "flex-start",
    width: 30,
    height: 30,
    marginLeft: -105,
  },
  balance: {
    marginTop: 40,
    marginLeft: -10,
    fontSize: 35,
    fontWeight: "bold",
  },
  balanceLabel: {
    marginTop: 1,
    marginLeft: -10,
    fontSize: 12,
  },
  title: {
    marginLeft: -170,
    marginTop: 40,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
  carModel: {
    width: 350,
    height: 350,
    marginTop: -50,
  },
  carInfo: {
    marginTop: -120,
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
  },
  item: {
    backgroundColor: "lightgrey",
    borderColor: "black",
    borderStyle: "solid",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 350,
  },
  itemContent: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

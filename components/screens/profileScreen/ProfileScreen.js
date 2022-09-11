import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Card,
} from "react-native";
import React, { useState } from "react";
import Input from "../../Input";
import { Button } from "@react-native-material/core";
import { HStack } from "@react-native-material/core";
import { useAuth } from "../../contexts/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar, Divider } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.mainContainer}>
        <View style={styles.topNav}>
          <HStack>
            <TouchableOpacity>
              <Ionicons name="menu-outline" size={32} style={styles.iconLeft} />
            </TouchableOpacity>

            <Text style={styles.logoText}>GasUp</Text>

            <Image
              style={styles.Logo}
              source={require("../../../assets/images/dragonLogo.png")}
            />

            <TouchableOpacity>
              <Ionicons
                name="person-circle"
                size={32}
                style={styles.iconRight}
              />
            </TouchableOpacity>
          </HStack>
        </View>
        <Avatar
          size={80}
          style={styles.avatar}
          icon={(props) => <Icon name="account" {...props} />}
        />
        <Text style={styles.usersName}>Firstname Lastname</Text>
        <Button
          style={styles.editButton}
          title="Edit"
          trailing={(props) => <Icon name="pencil" {...props} />}
        />
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
    fontSize: 20,
    marginLeft: 100,
    marginTop: -65,
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
    marginLeft: 100,
    marginTop: 5,
    justifyContent: "center",
    backgroundColor: "#2F6424",
  },
  topNav: {
    marginTop: 40,
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
    // position: "absolute",
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
    marginHorizontal: 10,
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
});

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
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Card,
} from "react-native";
import React, { useState } from "react";
import Input from "../../Input";
import { Button } from "@react-native-material/core";
import { HStack } from "@react-native-material/core";
import { useAuth } from "../../contexts/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Avatar, ListItem } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
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
            <Ionicons name="person-circle" size={32} style={styles.iconRight} />
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

      <Text style={styles.title}>Transaction History</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </ScrollView>
      </SafeAreaView>
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
  container: {
    flex: 1,
  },
  avatar: {
    marginLeft: -220,
    marginTop: 20,
    backgroundColor: "#2F6424",
  },
  usersName: {
    fontSize: 18,
    marginLeft: 50,
    marginTop: -65,
  },
  usersEmail: {
    fontSize: 15,
    marginLeft: 12,
    marginTop: 0,
  },
  editButton: {
    padding: 0,
    width: 130,
    height: 30,
    marginLeft: 50,
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
    marginTop: 30,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 25,
    color: "#2F6424",
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

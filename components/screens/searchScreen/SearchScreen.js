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

export default function SearchScreen({ navigation }) {
    // async function searchUser() {
    //     setLoading(true);
    //     try {

    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // }

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            keyboardShouldPersistTaps="never"
            scrollEnabled={true}
        >
            <View style={styles.root}>
                <Input placeholder={"Search for a name..."}></Input>
                <TouchableOpacity>
                    <Ionicons name="search-outline" size={32} style={styles.searchIcon} />
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 20,
        marginTop: 70,
    },
    searchIcon: {
        color: "black",
        height: 30,
        width: 30,
        position: "relative",
        marginRight: 20,
        justifyContent: "flex-end",
        alignSelf: "right",
        alignContent: "flex-end",
    },
})
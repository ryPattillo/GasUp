import React, { useEffect, useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Button, 
    Image, 
    StatusBar, 
    Dimensions, 
    TouchableOpacity,
    Pressable } from "react-native"
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default HomeScreen = () => {
    return (
        <View style={styles.mainContainer}>
            {/* Top Nav */}
            <View style={styles.topNav}>
                <Text style={styles.logoText}>GasUp</Text>
                <Image
                    style={styles.ProfilePic}
                    source={require("../../assets/images/dragonLogo.png")}                    
                    />
                    <Pressable>
                        <Ionicons name="menu-outline" />
                    </Pressable>
                <Ionicons name="person-circle" style={styles.icon}/>

            </View>
            {/* Map View */}
            <View>
                <MapView style={styles.map} />
            </View>
        </View>

    )
}


// COMPONENT STYLES
const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        backgroundColor: "white",
        height: "100%",
    },
    ProfilePic: {
        // alignSelf: "center",
        width: 30,
        height: 30,
        // marginVertical: 20,
        // marginHorizontal: 10,
        flexDirection: "row", 
        marginRight: 50,
        // justifyContent: 'space-between'
        float: "left",
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    topNav: {
        marginTop: 40,
    },
    logoText: {
        alignItems: "center",
        justifyContent: "center",
        fontSize: 35,
        flexDirection: 'row', 
        // fontWeight: "light",
        color: "#2F6424",
        position: "absolute",
    },
    icon: {
        // size: 20,
        color:"#2F6424", 
        flexDirection: "row",
    },
    bottomCard: {
        color: "grey",
        justifyContent: "flex-end",
        // alignSelf: "bottom"
    },
});
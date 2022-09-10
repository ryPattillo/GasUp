import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";


export default function Input({value, setValue, placeholder,secureTextEntry }){


  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder={placeholder}
 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

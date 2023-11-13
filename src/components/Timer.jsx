import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Timer = ({ time }) => {
  const formattedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#d32e2a",
      padding: 40,
      flex: 0.3,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    time: {
      fontSize: 80,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formattedTime}</Text>
    </View>
  );
};

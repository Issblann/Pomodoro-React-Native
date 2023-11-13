import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Header = ({ currentTime, setCurrentTime, setTime }) => {
  const options = ["Pomodoro", "Short break", "Break"];
  const handlePress = (index) => {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
    setCurrentTime(index);
    setTime(newTime * 60);
  };
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 10,
    },
    text: {
      fontSize: 40,
      fontWeight: "bold",
    },
    view: {
      flexDirection: "row",
    },
    itemStyle: {
      borderWidth: 3,
      padding: 9,
      width: "33%",
      borderColor: "white",
      borderRadius: 10,
      marginVertical: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  return (
    <View style={[styles.container, { paddingHorizontal: 20 }]}>
      <Text style={styles.text}>Pomodoro</Text>
      <View style={styles.view}>
        {options.map((option, index) => (
          <TouchableOpacity
            style={[
              styles.itemStyle,
              currentTime !== index && { borderColor: "transparent" },
            ]}
            onPress={() => handlePress(index)}
            key={index}
          >
            <Text style={{ fontWeight: "bold" }}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "./src/components/Header";
import { useEffect, useState } from "react";
import { Timer } from "./src/components/Timer";
import { TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState(
    "pomo" | "short break" | "break"
  );
  const [isActive, setIsActive] = useState(false);
  const colors = ["#f1f1f1", "#fc583d", "#39373c"];

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(isWorking ? 300 : 1500);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);
  const handleStartStop = () => {
    playSound();
    setIsActive(!isActive);
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/mixkit-modern-click-box-check-1120.wav")
    );
    await sound.playAsync();
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    ifIsAndroid: {
      paddingTop: 50,
    },
    view: {
      flex: 1,
      paddingHorizontal: 10,
      gap: 15,
    },
    button: {
      fontSize: 20,
      backgroundColor: "black",
      padding: 24,
      borderRadius: 30,
      marginTop: 20,
      textAlign: "center",
    },
  });
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View
        style={[
          Platform.OS === "android" ? styles.ifIsAndroid : null,
          styles.view,
        ]}
      >
        <StatusBar style="auto" />
        <Header
          currentTime={currentTime}
          setTime={setTime}
          setCurrentTime={setCurrentTime}
        />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text
            style={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

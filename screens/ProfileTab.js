import * as React from "react";
import { Image, View, StyleSheet, Text } from "react-native";

export default function ProfileTab() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContent}>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://bootdey.com/img/Content/avatar/avatar1.png",
          }}
        />
        <Text style={styles.name}>John Wick</Text>
        <Text style={styles.name}>xyz@gmail.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  headerContent: {
    top: 60,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    color: "white",
    fontSize: 15,
  },
});

import react, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

export default function TripDetailsScreen({ navigation, route }) {
  const [mainButtonName, setMainButtonName] = useState("On Location");

  const {
    passengerName,
    pickUp,
    pickUpTime,
    pickUpNo,
    dropOff,
    contactNumber,
  } = route.params;

  function validati() {
    if (mainButtonName === "On Location") {
      setMainButtonName("Board");
    }

    if (mainButtonName === "Board") {
      setMainButtonName("Complete this trip");
    }

    if (mainButtonName === "Complete this trip") {
      navigation.navigate("BottomNavigation");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 55,
          backgroundColor: "black",
          borderBottomColor: "grey",
        }}
      >
        <View style={{ marginStart: 10, alignSelf: "center" }}>
          <MaterialCommunityIcons
            onPress={() => {
              console.log("back");
              navigation.navigate("BottomNavigation");
            }}
            name={"arrow-back"}
            color={"white"}
            size={26}
          />
        </View>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginStart: 10,
            textAlignVertical: "center",
          }}
        >
          Current Trip
        </Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trip# QA1425874254</Text>
        <View style={styles.headerTime}>
          <MaterialCommunityIcons
            name="time-outline"
            color={"white"}
            size={16}
          />
          <Text style={styles.headerText}>{pickUpTime}</Text>
        </View>
      </View>

      <View style={styles.headerTransportDetails}>
        <View>
          <Text style={styles.containerPickupText}>PICK-UP</Text>
          <Text style={styles.airlineNameText}>{pickUp}</Text>
          <Text style={styles.airlineDetailsText}>AA456 |T2</Text>
        </View>

        <View>
          <Text style={styles.containerDropoffText}>DROP-OFF</Text>
          <Text style={styles.airlineNameText}>{dropOff}</Text>
          <Text style={styles.airlineDetailsText}>144-02 135th |T2</Text>
        </View>
      </View>

      <View
        style={{
          borderStyle: "dotted",
          borderWidth: 1,
          borderRadius: 1,
        }}
      />


      <View style={{ top: 10, paddingStart: 22 }}>
        <Text style={styles.airlineDetailsText}>PAX DETAILS(2 Pilots)</Text>
        <Text style={styles.airlineNameText}>PAX DETAILS(2 Pilots)</Text>

        <View style={{ top: 10 }}>
          <Text style={styles.airlineDetailsText}>PAX DETAILS(2 Pilots)</Text>
          <Text style={styles.airlineNameText}>PAX DETAILS(2 Pilots)</Text>
        </View>
        
      </View>

      <View style={styles.buttonContainer}>
        <Button
      style={styles.button}
       accessibilityLabel="Learn more about this purple button"
        title="hkjh"
        />
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    color: "white",
  },
  headerTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTransportDetails: {
    marginVertical: 15,
    marginHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 0.24,
  },
  containerPickupText: {
    backgroundColor: "#007500",
    color: "white",
    paddingStart: 6,
    paddingVertical: 2,

    width: 50,
    fontSize: 10,
  },
  containerDropoffText: {
    backgroundColor: "red",
    color: "white",
    paddingStart: 6,
    paddingVertical: 2,
    width: 60,
    fontSize: 10,
  },
  airlineNameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  airlineDetailsText: {
    color: "gray",
    fontSize: 12,
    fontWeight: "400",
  },
  locationButton: {
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    borderTopStartRadius: 25,
    width: "90%",
    height: 50,
    backgroundColor: "#18599a",
    verticalAlign: "bottom",
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    flex: 1,
    alignItems:'center',
    justifyContent:'flex-end',
    padding:20,
    backgroundColor: 'pink',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: 50,
    backgroundColor: 'pink',
   flex:1,
  paddingHorizontal:10,
  marginHorizontal:10
  }
});
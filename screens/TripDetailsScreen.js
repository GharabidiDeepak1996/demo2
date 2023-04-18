import react, { useState } from "react";
import { Text, View, StyleSheet, Alert,TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

export default function TripDetailsScreen({ navigation, route }) {

  const {
    passengerName,
    pickUp,
    dropOff,
    pickUpTime,
    trip,
    noPax,
    airlineCode,
    flightNo,
    terminal,
    flightSchTime,
    newGreeterId,
    greeterName,
    newStatusId,
    statusName
  } = route.params;

  const [statusID, setStatusID] = useState(newStatusId);
  const [mainButtonName, setMainButtonName] = useState(statusName);
  // const [newGreeter, setNewGreeter] = useState(0);
  // const [newStatusId, setNewStatusId] = useState(1516);

  
var abc = parseInt(newGreeterId);
var xyz = parseInt(newStatusId);

  function validati() {
    if (statusID == 1515) {
      setMainButtonName("Board");
      setStatusID(1516)
      //setNewStatusId(1516)
    }

    if (statusID == 1516) {
      setMainButtonName("Complete this trip");
      setStatusID(1519)
      //setNewStatusId(1519)
    }

    if (statusID == 1519) {
      navigation.navigate("BottomNavigation");
      setStatusID(0)
      //setNewStatusId(0)
    }
  }


  const jobStatus  = async () => {
    console.log(trip);
    console.log(newGreeterId);
    console.log(statusID);
    try {
        const response = await
            fetch("http://132.148.73.104:8081/core/ver1.0/greeter/job/status", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  "trip_id": trip,
                  "greeter_id": abc,
                  "status_time": "04/14/2023 10:22",
                  "status_Id": xyz,
                  "latitude":15.00,
                  "longitude":87.36  
                })
            })

        const statusCode = response.status
        const json = await response.json()
        console.log(json);

        if (statusCode == 200) {
            const json = await response.json()
            if(json.isSuccess == true){
             //setStatusID(json)
            }else{
              ToastAndroid.show(json.resultMessage, ToastAndroid.SHORT);
            }
            console.log(json.resultMessage);
           // setData(json.Pairings)
        }
    } catch (error) {
        console.error(error);
    } finally {
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
        <Text style={styles.headerText}>Trip# {trip}</Text>
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
          <Text style={styles.airlineDetailsText}>{airlineCode} | {terminal}</Text>
        </View>

        <View style={{top:10}}>
          <Text style={styles.containerDropoffText}>DROP-OFF</Text>
          <Text style={styles.airlineNameText}>{dropOff}</Text>
          <Text style={styles.airlineDetailsText}>144-02 135th Ave, Queens, NY 11436, USA</Text>
        </View>
      </View>

      <View
        style={{
          borderStyle: "dotted",
          borderWidth: 1,
          borderRadius: 1,
          top:20
        }}
      />


      <View style={{ top: 30, paddingStart: 22 }}>
        <Text style={styles.airlineDetailsText}>PAX DETAILS({noPax} Pilots)</Text>
        <Text style={styles.airlineNameText}>Kay S. Johnson, Walter S. Ayers</Text>

        <View style={{ top: 20 }}>
          <Text style={styles.airlineDetailsText}>FLIGHT & AIRPORT DETAILS</Text>
          <Text style={styles.airlineNameText}>{airlineCode} | {terminal}</Text>
        </View>
        
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (statusID == 1515) {
              Alert.alert("Alert", "Have you reached on location?", [
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    //validati();
                    setStatusID(1516)
                    jobStatus();
                    console.log(mainButtonName);
                  },
                },
              ]);
            } else if (statusID == 1516) {
              Alert.alert("Alert", "Is everyone boarded?", [
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                   // validati();
                    jobStatus(1519);
                    console.log(mainButtonName);
                  },
                },
              ]);
            }else if (statusID == 1519) {
              Alert.alert("Alert", "Are you sure you want to complete this trip?", [
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
                {
                  text: "Yes",
                  onPress: () => {
                    validati();
                    jobStatus();
                    console.log(mainButtonName);
                  },
                },
              ]);
            }
          }}
          >
          <Text style={{color:'#ffff'}}>{mainButtonName}</Text>
 </TouchableOpacity>
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
   // backgroundColor: 'pink',
  },
 
  button:{
    width: '90%',
    height: '10%',
    backgroundColor:'#1E6738',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
}
});
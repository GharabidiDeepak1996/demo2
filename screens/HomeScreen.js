import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Linking,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { Button } from "@react-native-material/core";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "Pratik Maske",
    pickupFrom: "BOM Airport",
    noOfPickups: "3",
    dropOffAdd: "CSMT Station",
    pickUpTime: "4:30 PM",
    contact: "8433681861",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-d53abb28ba",
    name: "Deepak Gharabidi",
    pickupFrom: "Orient House, Fort, Mumbai",
    noOfPickups: "2",
    dropOffAdd: "Kurla Station",
    pickUpTime: "5:30 PM",
    contact: "8433681861",
  },
  {
    id: "bd7acbea-c1b1-46c2ed5-3ad53abb28ba",
    name: "Aboli Mane",
    pickupFrom: "Orient House, Fort, Mumbai",
    noOfPickups: "4",
    dropOffAdd: "Kalyan Station",
    pickUpTime: "5:40 PM",
    contact: "8433681861",
  },
];

const Item = ({
  bookingId,
  tripId,
  companyId,
  branchId,
  customerId,
  customerName,
  serviceType,
  pickupTime,
  noPax,
  pickupNotes,
  title,
  name,
  mobile,
  email,
  airlineCode,
  flightNo,
  terminal,
  flightSchTime,
  commissionAgentId,
  greeterId,
  greeterName,
  statusId,
  statusName,
  onSiteTime,
  boardTime,
  pickupFrom,
  dropOffAdd,
  // name,
  // pickupFrom,
  // noOfPickups,
  // dropOffAdd,
  // pickUpTime,
  // contact,
  // flightNo,
  // gate,
  // terminal,
  navigation,
}) => (
  <View style={styles.containerNew}>
    <View style={styles.namePaxContainer}>
      <View style={styles.pickupTimeContainer}>
        <Text style={{ fontSize: 22, fontWeight: "400" }}> {name}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginStart: 6,
            color: "black",
          }}
        >
          PAX {noPax}
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          flex: 1,
          marginEnd: 15,
          alignSelf: "center",
        }}
      >
        <View
          style={{ backgroundColor: "seagreen", borderRadius: 25, padding: 9 }}
        >
          <MaterialCommunityIcons
           name={"ios-call"}
            color={"#fff"} 
            size={22}
            onPress={()=>{Linking.openURL('tel:'+mobile);}} />
        </View>
      </View>
    </View>

    <View style={{ width: "100%", height: 1, backgroundColor: "#D3D3D3" }} />

    <View style={styles.namePaxContainer}>
      <View style={styles.pickupTimeContainer}>
        <Text style={styles.infoLabel}>PICK-UP</Text>
        <Text style={styles.title}>{pickupFrom}</Text>
        
          <Text style={styles.flightDetails}><Text ><Text>{flightNo} |</Text> {terminal} </Text> {''}</Text>
        
      </View>

      <View
        style={{
          alignItems: "flex-end",
          flex: 1,
          marginEnd: 15,
          alignSelf: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{pickupTime}</Text>
        </View>
      </View>
    </View>

    <View style={styles.item}>
      

      <View>
        <View flexDirection="row" style={{ marginStart: 5 }}>
          
        </View>
      </View>

      <View style={styles.contentView}></View>
      <Button
        title="Start this Ride"
        uppercase={false}
        style={styles.materialButtonPrimary}
        onPress={() => {
          navigation.navigate("TripDetailsScreen",{
            passengerName: name,
            pickUp: pickupFrom,
            dropOff: dropOffAdd,
            pickUpTime: pickupTime,
            trip:tripId,
            noPax: noPax,
            airlineCode:airlineCode,
            flightNo: flightNo,
            terminal:terminal,
            flightSchTime: flightSchTime,
            newGreeterId:greeterId,
            greeterName:greeterName,
            newStatusId:statusId,
            statusName:statusName
          })
          // navigation.navigate("TransportDetails", {
          //   passengerName: name,
          //   pickUp: pickupFrom,
          //   pickUpTime: pickUpTime,
          //   pickUpNo: noOfPickups,
          //   dropOff: dropOffAdd,
          //   contactNumber: contact,
          // });
        }}
      />
    </View>
  </View>
);

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [pax, setPax] = useState("");
  const [contact, setContact] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [terminal, setTerminal] = useState("");
  const [gate, setGate] = useState("");
  const [data, setData] = useState([]);

  const apiCall = async () => {
    try {
      const response = await fetch(
        "http://132.148.73.104:8081/core/ver1.0/greeter/jobs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: 2,
            service_provider_id: 2,
            customer_id: 4,
            branch_id: 1,
            from_date: "04/04/2023 09:25",
            to_date: "04/10/2023 23:25",
          }),
        }
      );
      const statuscode = response.status;
      if (statuscode === 200) {
        const json = await response.json();
        setData(json.greeterJob);
        console.log(data)
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.driversLogin}>My Trips</Text>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
          bookingId={item.booking_id}
          tripId={item.trip_id}
          companyId={item.company_id}
          branchId={item.branch_id}
          customerId={item.customer_id}
          customerName={item.customer_name}
          serviceType={item.service_type}
          pickupTime={item.pickup_time}
          noPax={item.no_of_pax}
          pickupNotes={item.pickup_notes}
          title={item.title}
          name={item.first_name +" "+ item.last_name}
          mobile={item.mobile}
          email={item.email}
          airlineCode={item.airline_code}
          flightNo={item.flight_no}
          terminal={item.terminal}
          flightSchTime={item.flight_sch_time}
          commissionAgentId={item.commission_agent_id}
          greeterId={item.greeter_id}
          greeterName={item.greeter_name}
          statusId={item.status_id}
          statusName={item.status_name}
          onSiteTime={item.on_site_time}
          boardTime={item.board_time}
          pickupFrom={"Mumbai"}
          dropOffAdd={"Pune"}
          navigation={navigation}
          />
        )}
        keyExtractor={(itemNew) => itemNew.id}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  item: {
    backgroundColor: "#fff",
    padding: 0,
    borderRadius: 16,

    marginVertical: 8,
    marginHorizontal: 16,
  },
  containerNew: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 6,
    borderColor: "#18599a",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  passengerContainer: {
    backgroundColor: "#edf2f7",
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 0,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: "#18599a",
  },
  pickupTimeContainer: {
    padding: 7,
  },
  namePaxContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    borderEndColor: "white",
    borderLeftColor: "white",
    borderBottomColor: "light-grey",
  },
  title: {
    fontWeight: "400",
    fontSize: 17,
    marginStart: 5,
  },
  pickUpTimeStyle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  driversLogin: {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#000000",
    marginBottom: 6,
    fontSize: 26,
    marginTop: 15,
    marginLeft: 16,
  },
  infoLabel: {
    backgroundColor: "seagreen",
    fontWeight: "regular",
    alignSelf: "baseline",
    fontFamily: "sans-serif",
    color: "#fff",
    fontSize: 10,
    paddingStart: 5,
    paddingEnd: 5,
    paddingBottom: 2,
    paddingTop: 2,
    marginTop: 4,
    marginStart: 5,
    letterSpacing: 0.5,
  },
  materialButtonPrimary: {
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    borderTopStartRadius: 25,
    marginTop: 11,
    marginBottom: 11,
    marginEnd: 0,
    marginStart: 0,
    height: 45,
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
  },
  flightDetails:{
    fontSize: 14,
    fontWeight: "400",
    color: "grey",
    marginStart: 8,
  }
});

import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Alert } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const UserDetailsScreen = () => {
  const params = useLocalSearchParams(); //On button press, it navigates to a dynamic page and sends data through query parameters.
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [currentDate, setCurrentDate] = useState(moment());

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPreviousDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const submitAttendance = async () => {
    try {
      const attendanceData = {
        employeeId: params?.id,
        name: params?.name,
        date: currentDate.format("MMMM D, YYYY"),
        status: attendanceStatus,
      };

      const response = await axios.post(
        "http://192.168.0.103/attendance",
        attendanceData
      );

      if (response.status === 200) {
        Alert.alert(`Attendance submitted successfully for ${params?.name}`);
      }

    } catch (error) {
      console.log("Error submitting the attendance", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginLeft: "auto",
          marginRight: "auto",
          marginVertical: 20,
        }}
      >
        <AntDesign
          onPress={goToPreviousDay}
          name="left"
          size={25}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign onPress={goToNextDay} name="right" size={25} color="black" />
      </View>
      <Pressable
        style={{
          marginVertical: 10,
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            marginRight: 10,
            borderRadius: 8,
            padding: 10,
            backgroundColor: "#123458",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 21, fontWeight: "bold" }}>
              {params?.name.charAt(0)}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 19, fontWeight: "condensedBold" }}>
            {params?.name}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {params?.designation} ({params?.id})
          </Text>
        </View>
      </Pressable>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 12 }}>
        Basic Pay: {params?.salary}
      </Text>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 12,
            letterSpacing: 3,
            marginTop: 8,
          }}
        >
          ATTENDANCE
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setAttendanceStatus("Present")}
            style={{
              backgroundColor: "#D4C9BE",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              gap: 10,
            }}
          >
            {attendanceStatus === "Present" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#000" />
            ) : (
              <Entypo name="circle" size={24} color="#000" />
            )}
            <Text>Present</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAttendanceStatus("Absent")}
            style={{
              flex: 1,
              backgroundColor: "#D4C9BE",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {attendanceStatus === "Absent" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#000" />
            ) : (
              <Entypo name="circle" size={24} color="#000" />
            )}
            <Text>Absent</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setAttendanceStatus("HalfDay")}
            style={{
              backgroundColor: "#D4C9BE",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              gap: 10,
            }}
          >
            {attendanceStatus === "HalfDay" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#000" />
            ) : (
              <Entypo name="circle" size={24} color="#000" />
            )}
            <Text>HalfDay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAttendanceStatus("Holiday")}
            style={{
              flex: 1,
              backgroundColor: "#D4C9BE",
              padding: 10,
              borderRadius: 8,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            {attendanceStatus === "Holiday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="#000" />
            ) : (
              <Entypo name="circle" size={24} color="#000" />
            )}
            <Text>Holiday</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 10,
          }}
        >
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 0.5,
              borderColor: "#000",
              padding: 10,
              flex: 1,
            }}
            placeholder="Advance / Loans"
            placeholderTextColor="#123458"
          />
          <TextInput
            placeholder="Extra Bonus"
            placeholderTextColor="#123458"
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 0.5,
              borderColor: "#000",
              padding: 10,
              flex: 1,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={()=>submitAttendance()}
          style={{
            padding: 15,
            backgroundColor: "#123458",
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 30,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              textAlign: "center",
              color: "#fff",
              fontSize: 16,
            }}
          >
            Submit the Attendance
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({});

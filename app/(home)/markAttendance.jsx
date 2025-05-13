import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import employees from "./employees";
import { router } from "expo-router";

const markAttendance = () => {
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

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://192.168.0.103:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error while fetching the employee data", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const [attendance, setAttendance] = useState([]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`http://192.168.0.103/attendance`, {
        params: {
          date: currentDate.format("MM D, YYYY"),
        },
      });
      setAttendance(response.data);
    } catch (error) {
      console.log("Error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity>
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
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={25}
            color="black"
          />
        </View>

        <View style={{ marginHorizontal: 12 }}>
          {employees.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/[user]",
                  params: {
                    name: item?.name,
                    id: item?.employeeId,
                    salary: item?.salary,
                    designation: item?.designation,
                  },
                })
              }
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: "#D4C9BE",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 21, fontWeight: "bold" }}
                >
                  {item?.name?.charAt(0)}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 19, fontWeight: "condensedBold" }}>
                  {item?.name}
                </Text>
                <Text style={{ marginTop: 5, color: "gray" }}>
                  {item?.designation} ({item?.employeeId})
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default markAttendance;

const styles = StyleSheet.create({});

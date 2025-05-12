import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchResults from "../../components/SearchResults";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("http://192.168.0.102:8000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.log("Error while fetching the employee data", error);
      }
    };

    fetchEmployeeData();
  }, []);

  console.log(employees);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          marginTop: 12,
          marginLeft: 5,
        }}
      >
        <Ionicons
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "#fff",
            flex: 1,
            height: 40,
            borderRadius: 5,
            marginLeft: 10,
          }}
        >
          <AntDesign name="search1" size={22} color="black" />
          <TextInput
            style={{ flex: 1 }}
            value={input}
            onChangeText={(e) => setInput(e)}
            placeholder="Search"
          />

          {employees.length > 0 && (
            <View>
              <Pressable>
                <AntDesign name="pluscircle" size={24} color="#123458" />
              </Pressable>
            </View>
          )}
        </Pressable>
      </View>
      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on the plus button and add your employee</Text>
          <Pressable onPress={() => router.push("/(home)/addDetails")}>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const AddDetails = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");

  const handleRegister = () => {
    const employeeData = {
      name,
      employeeId,
      designation,
      mobileNo,
      dob,
      joiningDate,
      activeEmployee: true,
      salary,
      address,
    };

    axios
      .post("http://192.168.0.101:8000/addEmployee", employeeData)
      .then((response) => {
        Alert.alert(
          "Registration Successfull",
          "You have been registered successfully"
        );
        setName("");
        setAddress("");
        setDesignation("");
        setDob("");
        setEmployeeId("");
        setJoiningDate("");
        setMobileNo("");
        setSalary("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Failed",
          "An error have occurred during the registration process"
        ),
          console.log(error);
      });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add a new Employee:
        </Text>

        <TextInput
          placeholder="India"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 0.5,
            marginTop: 15,
            borderRadius: 5,
          }}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Full Name (First and last Name)
          </Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={(e) => setName(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Employee ID</Text>
          <TextInput
            placeholder="Employee ID"
            value={employeeId}
            onChangeText={(e) => setEmployeeId(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Designation</Text>
          <TextInput
            placeholder="Designation"
            value={designation}
            onChangeText={(e) => setDesignation(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Mobile Number
          </Text>
          <TextInput
            placeholder="Mobile No."
            value={mobileNo}
            onChangeText={(e) => setMobileNo(e)}
            keyboardType="decimal-pad"
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Date Of Birth
          </Text>
          <TextInput
            placeholder="eg. dd-mm-yyyy"
            value={dob}
            onChangeText={(e) => setDob(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Joining Date</Text>
          <TextInput
            placeholder="eg. dd-mm-yyyy"
            value={joiningDate}
            onChangeText={(e) => setJoiningDate(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text>Active Employee</Text>
          <Text>True</Text>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Salary</Text>
          <TextInput
            keyboardType="decimal-pad"
            placeholder="Salary in 000000 format"
            value={salary}
            onChangeText={(e) => setSalary(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <View>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Address</Text>
          <TextInput
            placeholder="Enter Address"
            value={address}
            onChangeText={(e) => setAddress(e)}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 0.5,
              marginTop: 15,
              borderRadius: 5,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleRegister()}
          style={{
            backgroundColor: "#ABCABA",
            padding: 10,
            justifyContent: "center",
            marginTop: 20,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Add Employee
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddDetails;

const styles = StyleSheet.create({});

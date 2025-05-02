import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

const AddDetails = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");

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
            placeholder="Enter Date of Birth"
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
            placeholder="Joining Date"
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
            placeholder="Enter Salary"
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

        <Pressable
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
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddDetails;

const styles = StyleSheet.create({});

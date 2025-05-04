import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const SearchResults = ({ data, input, setInput }) => {
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item?.name.toLowerCase().includes(input.toLowerCase())) {
            return (
              <View
                style={{ marginVertical: 10, gap: 10, flexDirection: "row" }}
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
                  <Text style={{color:'#fff', fontSize:21, fontWeight:'bold'}}>{item?.name?.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={{fontSize:19, fontWeight:'condensedBold'}}>{item?.name}</Text>
                  <Text style={{marginTop:5, color:'gray'}}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});

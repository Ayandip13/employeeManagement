import { StyleSheet, Text, View } from 'react-native'
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from 'expo-router'
import {AntDesign} from '@expo/vector-icons'

const UserDetailsScreen = () => {
    const params = useLocalSearchParams() //On button press, it navigates to a dynamic page and sends data through query parameters.

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

    return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
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
        </View>
  )
}

export default UserDetailsScreen

const styles = StyleSheet.create({})
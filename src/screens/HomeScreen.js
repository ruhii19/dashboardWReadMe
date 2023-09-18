import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'

const HomeScreen = ({ navigation, route }) => {
  const { email, password } = route.params
  const URL = `https://irflabs.in/gedl/edllogin.php?userId=${email}&pass=${password}`
  const [isLoading, setLoading] = useState(true)

  const [data, setData] = useState([])
  const [hasDevId, setHasDevId] = useState(false)

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
        // Check if the response contains an array of devices with DevId
        if (Array.isArray(json) && json.some((item) => item.DevId)) {
          setHasDevId(true)
        }
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => {
        setLoading(false)
      }) // change loading state
  }, [])

  // Also get call asynchronous function
  const batteryData = []
  const temperatureData = []
  const humidityData = []
  const rainData = []
  const soilMoistureData = []
  const timeData = []
  const devId = []
  // Loop through the jsonData array and extract and store data in respective arrays
  if (hasDevId) {
    data.forEach((item) => devId.push(item.DevId))
  } else {
    data.forEach((item) => {
      batteryData.push(item.Batt)
      temperatureData.push(item.Temp)
      humidityData.push(item.Hum)
      rainData.push(item.Rain)
      soilMoistureData.push(item.SoilM)
      timeData.push(item.TimeS)
    })
  }
  console.log(temperatureData)
  console.log(humidityData)
  console.log(devId)

  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : hasDevId ? (
        <View>
          {data.map((item, index) => (
            <Button
              key={index}
              title={`DevId: ${item.DevId}`}
              onPress={() =>
                navigation.navigate('MultiUser', {
                  name: 'MultiUser',
                  DevId: item.DevId
                })
              }
            />
          ))}
        </View>
      ) : (
        <View>
          <Button
            title="Temp"
            onPress={() =>
              navigation.navigate('Temp', {
                name: 'Temp',
                temperatureData: temperatureData
              })
            }
          />
          <Button
            title="Rain"
            onPress={() =>
              navigation.navigate('Rain', {
                name: 'Rain',
                rainData: rainData
              })
            }
          />
          <Button
            title="Humidity"
            onPress={() =>
              navigation.navigate('Humidity', {
                name: 'Humidity',
                humidityData: humidityData
              })
            }
          />
          <Button
            title="Soil Moisture"
            onPress={() =>
              navigation.navigate('Soil Moisture', {
                name: 'Soil Moisture',
                soilMoistureData: soilMoistureData
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  button1: {
    backgroundColor: 'powderblue',
    flexDirection: 'row'
  },
  buttonStyle: {
    height: 100,
    width: 50,
    backgroundColor: 'red'
  }
})
export default HomeScreen

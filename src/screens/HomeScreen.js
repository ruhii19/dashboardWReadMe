import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Button,
  ActivityIndicator,
  SafeAreaView
} from 'react-native'
import { Feather } from '@expo/vector-icons'

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
  const image = { uri: '' }
  return (
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : hasDevId ? (
        <View>
          {data.map((item, index) => (
            <Button
              style={styles.multiButton}
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
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button, styles.tempButton]}
            onPress={() =>
              navigation.navigate('Temp', {
                name: 'Temp',
                temperatureData: temperatureData
              })
            }
          >
            <View style={styles.iconContainer}>
              <Feather name={'thermometer'} size={24} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Temp</Text>
              <Text style={styles.value}>{temperatureData[0]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.rainButton]}
            onPress={() =>
              navigation.navigate('Rain', {
                name: 'Rain',
                rainData: rainData
              })
            }
          >
            <View style={styles.iconContainer}>
              <Feather name={'cloud-rain'} size={24} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Rain</Text>
              <Text style={styles.value}>{rainData[0]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.humButton]}
            onPress={() =>
              navigation.navigate('Humidity', {
                name: 'Humidity',
                humidityData: humidityData
              })
            }
          >
            <View style={styles.iconContainer}>
              <Feather name={'droplet'} size={24} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Humidity</Text>
              <Text style={styles.value}>{humidityData[0]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.soilMButton]}
            onPress={() =>
              navigation.navigate('Soil Moisture', {
                name: 'Soil Moisture',
                soilMoistureData: soilMoistureData
              })
            }
          >
            <View style={styles.iconContainer}>
              <Feather name={'align-center'} size={24} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Soil</Text>
              <Text style={styles.title}>Moisture</Text>
              <Text style={styles.value}>{soilMoistureData[0]}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Horizontal arrangement
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
    marginTop: 350,
    backgroundColor: '#757b85'
  },
  imageLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 10, // Adjust spacing between buttons
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    shadowColor: 'black',
    padding: 10
  },
  iconContainer: {
    marginRight: 10,
    alignItems: 'center'
  },
  textContainer: {
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
  value: {
    color: 'white',
    fontSize: 14
  },
  tempButton: {
    backgroundColor: '#f70707'
  },
  rainButton: {
    backgroundColor: '#13b8eb'
  },
  humButton: {
    backgroundColor: '#a6b1ed'
  },
  soilMButton: {
    backgroundColor: '#2ce69b'
  },
  multiButton: {
    flex: 1,
    backgroundColor: '#69707a'
  }
})
export default HomeScreen

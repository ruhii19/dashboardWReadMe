import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator
} from 'react-native'
import TempScreen from './TempScreen'
// get data from this URL!

const movieURL = 'https://irflabs.in/gedl/edllogin.php?userId=pqrs&pass=s1234'

const GetData = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true)

  const [data, setData] = useState([])

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(movieURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
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

  // Loop through the jsonData array and extract and store data in respective arrays
  data.forEach((item) => {
    batteryData.push(item.Batt)
    temperatureData.push(item.Temp)
    humidityData.push(item.Hum)
    rainData.push(item.Rain)
    soilMoistureData.push(item.SoilM)
    timeData.push(item.TimeS)
  })

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TempScreen temperatureData={temperatureData} />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 48
  },
  movieText: {
    fontSize: 26,
    fontWeight: '200'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  description: {
    textAlign: 'center',
    marginBottom: 18,
    fontWeight: '200',
    color: 'green'
  }
})

export default GetData

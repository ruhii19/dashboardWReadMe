import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Button
} from 'react-native'
// get data from this URL!

const MultiUser = ({ navigation, route }) => {
  // managing state with 'useState'
  const { DevId } = route.params

  const URL = `https://irflabs.in/gedl/get10.php?DevId=${DevId}&user=abcd&pass=d1234`
  const [isLoading, setLoading] = useState(true)

  const [data, setData] = useState([])

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json)
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => {
        setLoading(false)
      }) // change loading state
  }, [])

  const batteryData = []
  const temperatureData = []
  const humidityData = []
  const rainData = []
  const soilMoistureData = []
  const timeData = []

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

export default MultiUser

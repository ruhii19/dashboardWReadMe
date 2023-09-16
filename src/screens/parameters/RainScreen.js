import React from 'react'
import { View, StyleSheet } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

const RainScreen = ({ navigation, route }) => {
  const { rainData } = route.params
  const data = {
    labels: [],
    datasets: [
      {
        data: rainData,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Line color for the first dataset
        strokeWidth: 2 // Line width for the first dataset
      }
    ]
  }

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={300}
        height={500}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default RainScreen

import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const HumidityScreen = ({ navigation, route }) => {
  const { humidityData, timeData } = route.params
  const reversedHumidity = humidityData.slice(0, 10).reverse() // Reversed copy of the data

  // Calculate the sum of all values in the reversedSoil array
  const sum = reversedHumidity.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  )

  // Calculate the average
  const average = sum / reversedHumidity.length

  console.log('Hum data:', humidityData)
  console.log('Average:', average)

  function extractTimeFromTimestamp(timestamp) {
    const parts = timestamp.split(' ')
    if (parts.length >= 4) {
      const timeParts = parts[3].split(':')
      if (timeParts.length >= 2) {
        return `${timeParts[0]}:${timeParts[1]}`
      }
    }
    return 'Invalid Timestamp'
  }

  function extractDateFromTimestamp(timestamp) {
    const parts = timestamp.split(' ')
    if (parts.length >= 3) {
      return `${parts[0]} ${parts[1]}`
    }
    return 'Invalid Timestamp' // Handle the case where the timestamp format is not as expected
  }
  const data = {
    labels: [
      [extractTimeFromTimestamp(timeData[9])],
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      [extractTimeFromTimestamp(timeData[0])]
    ],
    datasets: [
      {
        data: reversedHumidity,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('../../../assets/humidity.gif')}
      />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.par}>Current</Text>
          <Text style={styles.curr}>
            {humidityData[0]}
            <Text style={styles.unit}>%</Text>
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.par}>Average</Text>
          <Text style={styles.curr}>
            {average.toFixed(1)}
            <Text style={styles.unit}>%</Text>
          </Text>
        </View>
      </View>

      <LineChart
        data={data}
        width={Dimensions.get('window').width / 1.05}
        height={Dimensions.get('window').height / 3}
        yAxisSuffix=" %"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: 'white',
          backgroundGradientTo: 'white',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(	51, 204, 204, ${opacity})`,
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
    alignItems: 'center',
    //backgroundColor: '#f0f1f7',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  icon: {
    height: 640 / 3.5,
    width: 640 / 3.5,
    //marginTop: 20

    marginBottom: Dimensions.get('window').height / 16
    //padding: 50
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center'
  },
  par: {
    fontSize: Dimensions.get('window').height / 23,
    fontFamily: 'sans-serif-thin'
  },
  curr: {
    fontSize: Dimensions.get('window').height / 16,
    //fontFamily: 'sans-serif-thin',
    fontFamily: 'sans-serif-light',
    //fontWeight: '100',
    marginBottom: Dimensions.get('window').height / 9
  },
  unit: {
    fontSize: Dimensions.get('window').height / 23,
    fontFamily: 'sans-serif-thin'
  },
  chart: {
    flex: 1
  }
})

export default HumidityScreen

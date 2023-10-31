import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const TempScreen = ({ navigation, route }) => {
  const { temperatureData } = route.params
  const reversedTemp = temperatureData.slice(0, 10).reverse() // Reversed copy of the data
  //const reversedTemp = temperatureData
  // Calculate the sum of all values in the reversedSoil array
  const sum = reversedTemp.reduce((acc, currentValue) => acc + currentValue, 0)

  // Calculate the average
  const average = sum / reversedTemp.length

  console.log('Temp data:', temperatureData)
  console.log('Average:', average)

  const data = {
    labels: [],
    datasets: [
      {
        data: reversedTemp,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Line color for the first dataset
        strokeWidth: 2 // Line width for the first dataset
      }
    ]
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('../../../assets/watering-can.gif')}
      />
      <View style={styles.textContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.par}>Current</Text>
          <Text style={styles.curr}>
            {temperatureData[0]}
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

export default TempScreen

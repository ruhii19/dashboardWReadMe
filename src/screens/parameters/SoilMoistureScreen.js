import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const RainScreen = ({ navigation, route }) => {
  const { soilMoistureData } = route.params
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        data: soilMoistureData,
        color: (opacity = 1) => `rgba(	51, 204, 204, ${opacity})`, // Line color for the first dataset
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
      <Text style={styles.par}>Current</Text>
      <Text style={styles.curr}>
        {soilMoistureData[0]}
        <Text style={styles.unit}>%</Text>
      </Text>

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

export default RainScreen

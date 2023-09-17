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

const movieURL = 'https://irflabs.in/gedl/get10.php?devId=%22G00456%22'

const MultiUser = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text>JSON Data:</Text>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{JSON.stringify(item, null, 2)}</Text>
            )}
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

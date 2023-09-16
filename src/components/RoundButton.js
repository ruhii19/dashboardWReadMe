import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const RoundButton = (props) => {
  const { buttonText, buttonColor, buttonIcon } = props
  const buttonClickedHandler = () => {
    console.log('You have clicked a button!')
    // do something
  }

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={buttonClickedHandler}
        style={[styles.roundButton, buttonColor]}
      >
        <Feather name={buttonIcon} size={24} color="black" />
        <Text>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  roundButton: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100
  }
})

export default RoundButton

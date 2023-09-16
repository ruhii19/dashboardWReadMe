import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert
} from 'react-native'
import React, { useState } from 'react'

const LoginScreen = ({ navigation }) => {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  const handleButtonPress = () => {
    if (text1 === '' || text2 === '') {
      // Both fields are empty, show an alert
      Alert.alert('Email and Password are mandatory fields')
    } else {
      // Proceed with the button's functionality
      // You can add your logic here
      navigation.navigate('Home', {
        email: text1,
        password: text2
      })
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#491659'} />
      <View
        style={{
          paddingVertical: 12,
          width: '95%',
          alignSelf: 'center',
          marginBottom: 20
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 25,
            fontWeight: 'bold'
          }}
        >
          Login
        </Text>
      </View>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        value={text1}
        onChangeText={setText1}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.input}
        value={text2}
        onChangeText={setText2}
      />
      <TouchableOpacity
        style={[styles.login, { width: '95%' }]}
        onPress={handleButtonPress}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.SignUp}>
        <View>
          <Text>Don't have an account?</Text>
        </View>
        <View style={styles.login}>
          <TouchableOpacity>
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                paddingHorizontal: 10
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#d6b6e0',
    width: '100%'
  },
  input: {
    padding: 10,
    borderColor: '#491659',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center'
  },
  login: {
    backgroundColor: '#491659',
    borderRadius: 25,
    alignSelf: 'center',
    padding: 10,
    elevation: 2
  },
  loginText: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
  head: {
    paddingVertical: 12,
    width: '95%',
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: 'bold'
  },
  SignUp: {
    marginTop: 15,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default LoginScreen

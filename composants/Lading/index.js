import React, {useState} from 'react'
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { ImageBackground, Text, View } from 'react-native'
import Header from '../Header'

const Lading = ({navigation}) => {
  return (
    <View style={{flexDirection: 'column', height:'100%'}}>
      <View style={{height: '20%'}}>
        <Header />
      </View>
      <View style={styles.welcomePage}>
          <View style={styles.leftBox}>
            <Pressable 
              onPress={() => navigation.navigate('SignUp')}
              style={({ pressed }) => [
                { backgroundColor: pressed ? 'white' : 'black' },
                { opacity: pressed ? 0.3 : 1 },
                styles.btnWelcome
              ]}
              >
              <Text style={{color: 'white', textAlign: 'center'}}>Inscription</Text>
            </Pressable>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
            <Text style={{color: 'white', textAlign: 'center'}}>Je vais creer le compte plus tard, je veux jouer !</Text>
          </TouchableOpacity>
          <View style={styles.rightBox}>
            <Pressable 
              onPress={() => navigation.navigate('Login')}
              style={({ pressed }) => [
                { backgroundColor: pressed ? 'white' : 'black' },
                { opacity: pressed ? 0.3 : 1 },
                styles.btnWelcome
              ]}
              >
              <Text style={{color : 'white', textAlign: 'center'}}>Connexion</Text>
            </Pressable>
          </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  myText: {
    color: '#fff',
    textAlign: 'center',  
    fontSize: 40,
    marginTop: 20
  },
  welcomePage: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    backgroundColor: '#4f78a4',
  },
  btnWelcome: {
    borderWidth: 3,
    borderColor: 'white',    
    color: 'white',
    width: 200,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 5,
    backgroundColor: 'transparent',
    fontWeight: 'normal',
    fontSize: 19,
    textAlign: 'center',
    textDecorationLine: 'none',
    marginTop: 0,
  },
  leftBox: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBox: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Lading
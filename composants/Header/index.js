import React from 'react'
import { ImageBackground, StyleSheet, Text } from 'react-native'


const Header = () => {
  return (
      <>
        <ImageBackground
          style={styles.container}
          source={require('../../assets/images/bg-noise-texture.png')}
          >
          <Text style={styles.myText}>MARVEL QUIZZ</Text>
        </ImageBackground>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    backgroundRepeat: 'repeat',
  },myText: {
    color: '#fff',
    textAlign: 'center',  
    fontSize: 40,
    marginTop: 20
  },
})

export default Header
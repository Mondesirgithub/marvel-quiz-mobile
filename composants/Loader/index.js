import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Loader = ({chargerMsg,styling}) => {
  return (
    <>
        <View style={styles.loader}></View>
        <Text style={styling}>
          {chargerMsg}
        </Text>
    </>
  )
}

const styles = StyleSheet.create({
  loader: {
    borderWidth: 10,
    borderColor: 'lightgrey',
    borderRadius: 50,
    borderTopWidth: 10,
    borderTopColor: 'blue',
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    transform: [{rotate: '360deg'}],
  }
})

export default Loader
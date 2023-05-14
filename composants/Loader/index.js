import React from 'react'
import { Text, View, StyleSheet,ActivityIndicator } from 'react-native'

const Loader = ({chargerMsg,styling}) => {
  return (
    <>
        {/* <View style={styles.loader}></View>
        <Text style={styling}>
          {chargerMsg}
        </Text> */}
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#4f78a4" />
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
})

export default Loader
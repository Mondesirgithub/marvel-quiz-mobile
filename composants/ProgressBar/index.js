import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const ProgressBar = ({numeroQuestion = 0, questions}) => {
  
  const progression = (numeroQuestion+1) * 10
  
  return (
    <>
      <View style={styles.percentage}>
        <View style={styles.progressPercent}>
          <Text style={{textAlign: 'center'}}> Question {numeroQuestion+1}/{questions.length}</Text>
        </View>
        <View style={styles.progressPercent}>
          <Text style={{textAlign: 'center'}}> Progression {progression}%</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View 
        style={{
          height: 18,
          textAlign: 'center',
          borderRadius: 5,
          backgroundColor: '#4f78a4',
          width: `${progression}%`
        }}
        ></View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  percentage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressPercent: {
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    color: '#000',
    flex: 0,
    flexGrow: 1,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: -30
  },
  progressBar: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    shadowColor: '#d3d1d1',
    shadowOffset: {
      width: -1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    height: 30,
    marginVertical: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});

export default React.memo(ProgressBar)
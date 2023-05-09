import React, { useState } from 'react'
import { Button, View, StyleSheet } from 'react-native'
import StepIndicator from 'react-native-step-indicator';

const labels = ["Débutant","Confirmé","Expert"];
const customStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize:45,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4f78a4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4f78a4',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#4f78a4',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4f78a4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#4f78a4',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fff',
  stepIndicatorLabelFinishedColor: '#4f78a4',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#4f78a4',
  labelSize: 13,
  currentStepLabelColor: '#4f78a4'
} 

const Level = ({level = 0}) => {
  
  const [currentPosition, setCurrentPosition] = useState(level)

  return (
    <View style={styles.levelsContainer}>
        <StepIndicator
            stepCount={labels.length}
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
        /> 
        {/* <Button  title='Next' onPress={() => setCurrentPosition(currentPosition+1)} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  levelsContainer: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    marginBottom: 40,
  },
});

export default Level
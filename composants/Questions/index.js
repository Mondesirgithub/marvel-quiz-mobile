
import { memo, useState } from "react"
import { View, Button, Text, TouchableOpacity,StyleSheet } from "react-native"
// import { FaChevronRight } from "react-icons/fa"

const Questions = ({suivant, precedent, question, selectedOption, firstLastQuestion, handleSelectedOption, selectedOptionIndex}) => {
    

  let bouton = null
  if(firstLastQuestion.firstQuestion === true && firstLastQuestion.lastQuestion === false ){
    bouton = <Button disabled={!selectedOption.etat} color="#4f78a4" onPress={suivant} title='Suivant' />
  }else if(firstLastQuestion.firstQuestion === false && firstLastQuestion.lastQuestion === true){
    bouton = <>
      <Button color="#4f78a4" onPress={precedent} title='Précédent' />
      <Button disabled={!selectedOption.etat} color="#4f78a4" onPress={suivant} title='Terminer' />
    </>
  }else{
    bouton = <>
    <Button color="#4f78a4" onPress={precedent} title='Précédent' />
    <Button disabled={!selectedOption.etat} color="#4f78a4" onPress={suivant} title='Suivant' />
  </>
  }

  return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 20, textAlign: 'center'}}>{question?.question}</Text>
        {
         Array.isArray(question?.options) && 
         question?.options.map((option, index) => {
            return (<TouchableOpacity key={index}
                          style={[
                          styles.answerOptions,
                          selectedOptionIndex === index && styles.selectedOption,
                        ]}
                        onPress={() => handleSelectedOption(index)}>
                      <Text style={{color: 'black', textAlign: 'center',fontWeight: selectedOptionIndex === index ? 'bold' : 'normal', textTransform: selectedOptionIndex === index ? 'uppercase' : 'capitalize'}}>{option}</Text>
                    </TouchableOpacity>)
          })
        } 
        <View style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'row', marginTop: 20}}>
          { bouton }
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  answerOptions: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    lineHeight: 20,
    textAlign: 'left',
    borderWidth: 0,
    color: '#000',
    fontWeight: 'bold',
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4f78a4',
    fontWeight: 'bold'
  },
  btnSubmit: {
    fontSize: 16,
    padding: 6,
    backgroundColor: '#4a90e2',
    color: '#fff',
    borderColor: '#4a90e2',
    borderRadius: 5,
    width: 95,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default memo(Questions)
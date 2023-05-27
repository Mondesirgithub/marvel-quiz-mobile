/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View,ScrollView } from 'react-native'
import {useEffect, useState, memo} from 'react' 
import Level from '../Level'
import Logout from '../Logout'
import ProgressBar from '../ProgressBar'
import Questions from '../Questions'
import {QuizMarvel} from '../quizMarvel'
import QuizOver from '../QuizOver'


function ajouterElement(tableau, nouvelElement) {
  if(Array.isArray(tableau)){
    tableau.push(nouvelElement);
  }
  return tableau;
}

const Quiz = ({route}) => {
  const [level, setLevel] = useState(0)
  const [numeroQuestion, setNumeroQuestion] = useState(0)
  const [questions, setQuestions] = useState({})
  const [selectedOption, setSelectedOption] = useState({
    prevReponse : [],
    actuelReponse : null,
    nextReponse : [],
    etat : false
  })
  const [firstLastQuestion, setFirstLastQuestion] = useState({
    firstQuestion : false,
    lastQuestion : false
  })
  const [answersUser, setAnswersUser] = useState({})
  const [score, setScore] = useState(0)

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // const myUser = route.params.user



  const handleSelectedOption = index => {
    
    setSelectedOptionIndex(index);

    setSelectedOption(prevState => ({
      ...prevState,
      actuelReponse: questions[numeroQuestion].options[index],
      etat : true
    }))
  };

 
  useEffect(() => {
    const questions = level === 0 ? QuizMarvel[0].quizz.debutant : (level === 1 ? QuizMarvel[0].quizz.confirme : QuizMarvel[0].quizz.expert)
    setQuestions(questions)

    if(numeroQuestion === 0){
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: true,
        lastQuestion: false
      }))
    }else if(numeroQuestion === questions.length-1){
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: false,
        lastQuestion: true
      }))
    }else{
      setFirstLastQuestion(prevState => ({
        ...prevState,
        firstQuestion: false,
        lastQuestion: false
      }))
    }

  }, [level, numeroQuestion])

  const precedent = () => {
    setNumeroQuestion(numeroQuestion - 1)
    setSelectedOption(prevState => ({
      ...prevState,
      nextReponse : ajouterElement(prevState.nextReponse, prevState.actuelReponse),
      actuelReponse : prevState.prevReponse.length === 0 ? null : prevState.prevReponse.pop(),
      etat : true
    }))
   
  }

  const niveauSuivant = () => {
    setLevel(level + 1)
    setNumeroQuestion(0)
  }

  const rejouer = () => {
    setNumeroQuestion(0)
  }

  const recommencer = () => {
    setLevel(0)
    setNumeroQuestion(0)
  }


  const suivant = () => {
    if(numeroQuestion === 9){
      setNumeroQuestion(numeroQuestion + 1)
      let sum = 0
      for(let i in answersUser){
        if(answersUser[i] === null){
        }else{
        sum += (answersUser[i] === questions[i].answer)
        }
      }
      setScore(sum)
    }else{
      setNumeroQuestion(numeroQuestion + 1)
    }
    
    setSelectedOption(prevState => ({
      ...prevState,
      prevReponse : ajouterElement(prevState.prevReponse, prevState.actuelReponse),
      actuelReponse : prevState.nextReponse.length === 0 ? null : prevState.nextReponse.pop()
    }))

    setSelectedOption(prevState => ({
      ...prevState,
      etat : prevState.actuelReponse === null ? false : true
    }))  
  }

  useEffect(() => {    
    setAnswersUser(prevState => ({
      ...prevState,
        [numeroQuestion] : selectedOption.actuelReponse
      }
    )) 
    
    if(!selectedOption.actuelReponse){
      setSelectedOptionIndex(null)
    }else{
      setSelectedOptionIndex(questions[numeroQuestion].options.findIndex(option => option === selectedOption.actuelReponse))
    }
  }, [selectedOption])

  useEffect(() => {
  }, [answersUser])

    return numeroQuestion === questions.length ? (
      <ScrollView style={styles.quizBg}>
        <View style={styles.container}>
          <QuizOver questions={questions} answersUser={answersUser} 
            score={score}
            numeroQuestion={numeroQuestion} 
            user={route.params ? route.params.user : false}
            niveauSuivant={niveauSuivant} 
            rejouer={rejouer}
            recommencer={recommencer}
            level={level}
            />
        </View>
      </ScrollView>
    ) : (
      <View style={styles.quizBg}>
        <View style={styles.container}>
          { route.params && <Logout/>}
          <Level level={level} />
          <ProgressBar numeroQuestion={numeroQuestion} questions={questions} />
          <Questions selectedOption={selectedOption} 
            suivant={suivant}
            precedent={precedent}
            selectedOptionIndex={selectedOptionIndex}
            handleSelectedOption={handleSelectedOption}
            firstLastQuestion={firstLastQuestion}
            question={questions[numeroQuestion]} />
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff', // la variable --white-color n'est pas valide en React Native
    padding: 0,
    marginBottom:30,
    flex: 1,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '80%',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%'
  },
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
},
quizBg: {
  margin: 0,
  padding: 0,
  backgroundColor: '#ffffff', // la variable --white-color n'est pas valide en React Native
  height: '100%'
},

})

export default memo(Quiz)
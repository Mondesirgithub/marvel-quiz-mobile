/* eslint-disable jsx-a11y/img-redundant-alt */
// import axios from 'axios';
import { useState, memo, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Button } from 'react-native'
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { FaCheckCircle } from 'react-icons/fa';
// import { FaTimesCircle } from 'react-icons/fa'
// import {GiTrophyCup} from 'react-icons/gi'
// import Loader from '../Loader';
// import Modal from '../Modal';
import { Table, Row } from 'react-native-table-component';


LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);

const QuizOver = ({questions , answersUser, score, niveauSuivant,rejouer,recommencer, level}) => {

  const [ouvrirModal, setOuvrirModal] = useState(false)
  const [caracterInfos, setCaracterInfos] = useState([])
  const [loading, setLoading] = useState(true)

  const [tableHead , setTableHead] = useState(['Question', 'Réponses', 'Vos réponses', 'Infos'])
  // (Array.isArray(questions) &&
  // questions.map(question => {
  //   return <tr key={question.id}>
  //     <td>{question.question}</td>
  //     <td>{question.answer}  </td>
  //     <td>{answersUser[question.id]} {answersUser[question.id].toString() === question.answer.toString() ? bravo : rate} </td>
  //     <td>
  //       <button onPress={() => afficherModal(question.heroId)} className='btnInfo'>Infos</button>
  //     </td>
      
  //   </tr>
  // }))
const lesQuestions = questions.map(item => item.question)
const lesReponses = questions.map(item => item.answer)
const lesReponsesUser = questions.map(item => answersUser[item.id])

let data = [];


  const [tableData , setTableData] = useState([])

  const bravo = <Icon name="check-circle" color="green" size={20}></Icon>
  const rate = <Icon name="times-circle" color="red" size={20}></Icon>

  useEffect(() => {
    for (let i = 0; i < lesQuestions.length; i++) {
      let row = [];
      row.push(lesQuestions[i]);
      row.push(lesReponses[i]);
      row.push(<Text style={{textAlign: 'center', marginTop: -10}}>{lesReponsesUser[i]}{"\n"}{lesReponsesUser[i] === lesReponses[i] ? bravo : rate}</Text>);
      row.push(<View style={{marginBottom: 30}}><Button title='Infos' color="#4f78a4" /></View>);
      data.push(row);
    }
    setTableData(data)
  }, [])

  // const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_APP_KEY
  // const hash = 'ab221b7acbc4b8caf1638489c621dfcb'
  
  // useEffect(() => {

  //   if(localStorage.getItem('MarvelStorageDate')){
  //     const date = localStorage.getItem('MarvelStorageDate')
  //     checkDataAge(date)
  //   }

  // }, [])
  

  // const checkDataAge = date => {
  //   const today = Date.now()
  //   const timeDifference = today - date
  //   const daysDifference = timeDifference/(1000*3600*24)
  //   if(daysDifference < 15){
  //     //si les donnees sont agees de plus de 15jours
  //     localStorage.clear()
  //     localStorage.setItem('MarvelStorageDate', Date.now())
  //   }
  // }

  // const afficherModal = id => {

  //   setOuvrirModal(true)

  //   if(!localStorage.getItem(id)){
  //     axios
  //     .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
  //     .then(response => {
  //       setCaracterInfos(response.data)
  //       setLoading(false)
  
  //       localStorage.setItem(id, JSON.stringify(response.data))
  
  //       if(!localStorage.getItem('MarvelStorageDate')){ //si la cle n'existe pas dans le localStorage
  //         localStorage.setItem('MarvelStorageDate', Date.now())
  //       }
      
  //     })
  //     .catch(error => console.log("Erreur : ",error))
  //   }else{
  //     setCaracterInfos(JSON.parse(localStorage.getItem(id)))
  //     setLoading(false)
  //   }
  // }


  // const masquerMoal = () => {
  //   setOuvrirModal(false)
  //   setLoading(true)
  // }

  // const capitalizeFirstLetter = string => {
  //   return string.charAt(0).toUpperCase()+string.slice(1)
  // }

  // const resultInModal = !loading ? (
  //     <Modal afficherModal={ouvrirModal}>
  //       <View className='modalHeader'>
  //         <h2>{caracterInfos.data.results[0].name}</h2>
  //       </View>
  //       <View className='modalBody'>
  //         <View className='comicImage'>
  //           <img src={`${caracterInfos.data.results[0].thumbnail.path}.${caracterInfos.data.results[0].thumbnail.extension}`} alt={`Image de ${caracterInfos.data.results[0].name}`}/>
  //           <p>{caracterInfos.attributionText}</p>
  //         </View>
  //         <View className='comicDetails'>
  //           <h3>Description</h3>
  //           {
  //             caracterInfos.data.results[0].description ?
  //             <p>{caracterInfos.data.results[0].description}</p>
  //             : <p>Description indisponible ...</p>
  //           }
  //           <h3>Plus d'infos</h3>
  //           {
  //             caracterInfos.data.results[0].urls && 
  //             Array.isArray(caracterInfos.data.results[0].urls) &&
  //             caracterInfos.data.results[0].urls.map((url, index) =>{
  //               return <a key={index} href={url.url} target='_blank' rel='noopener noreferrer'>
  //                 {capitalizeFirstLetter(url.type)}
  //               </a>
  //             })
  //           }
  //         </View>
  //       </View>
  //       <View className='modalFooter'>
  //         <button className='modalBtn' onPress={masquerMoal}>Fermer</button>
  //       </View>
  //   </Modal>
  // )
  // :
  // (
  //   <>
  //     <Modal afficherModal={ouvrirModal}>
  //       <View className='modalHeader'>
  //       </View>
  //       <View className='modalBody'>
  //         <View style={{display: 'flex', flexDirection: 'column'}}>
  //           <h2 style={{textAlign: 'center'}}>En attente des informations du site de Marvel ...</h2>
  //           <Loader />
  //         </View>
  //       </View>
  //       <View className='modalFooter'>
  //         <button className='modalBtn' onPress={masquerMoal}>Fermer</button>
  //       </View>
  //     </Modal>
  //   </>
  // )




  return (
    <>
    <View style={styles.stepsBtnContainer}>
      {
        score < 5 ? (
          <>
          <Text style={[styles.failureMsg , {textAlign: 'center'}]}>Désolé, vous avez échoué 😭</Text>
          <TouchableOpacity style={[styles.btnResult, styles.success]} onPress={rejouer}><Text style={{color: 'lightgreen', textAlign: 'center'}}>Rejouer</Text></TouchableOpacity>
          </>
        ) 
        : 
        (
        level < 2 ? (
          <>
          <Text style={[styles.successMsg, {textAlign: 'center'}]}>Bravo, passez au niveau suivant 😊</Text>
          <TouchableOpacity style={[styles.btnResult, styles.success]} onPress={niveauSuivant}><Text style={{color: 'lightgreen', textAlign: 'center'}}>Niveau suivant</Text></TouchableOpacity>
          </>
        ) 
        : 
        (
          <>
          <Text style={[styles.successMsg, {textAlign: 'center'}]}>Excéllent, vous avez terminé tout le quiz 😎</Text>
          <TouchableOpacity style={[styles.btnResult, styles.success]} onPress={recommencer}><Text style={{color: 'lightgreen', textAlign: 'center'}}>Recommencez le quizz</Text></TouchableOpacity>
          </>
        )
        )
      }
    </View>
    <View style={styles.percentage}>
      <View style={styles.progressPercent}><Text style={{textAlign: 'center'}}>Réussite: { score * 10 }%</Text></View>
      <View style={styles.progressPercent}><Text style={{textAlign: 'center'}}>Note {score}/10</Text></View>
    </View>
    <View style={{height: '100%'}}>
        <View style={styles.container}>
        <Table style={{overflow: 'scroll', width: '100%', height: '100%'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          {
            (score >= 0) ? (<ScrollView style={{height: '100%', marginBottom: 90}}>
                {tableData.map((rowData, index) => (
                  <Row key={index} data={rowData} textStyle={{textAlign: 'center', marginBottom: 30}}/>
                ))}
                </ScrollView>):(<Row data={["Vous ne pouvez pas voir les réponses ! car vous n'avez pas eu la moyenne"]} textStyle={{textAlign: 'center', marginBottom: 30, color: 'red'}}/>)
          }
          </Table>
        </View>
    </View>
    {/* {ouvrirModal && resultInModal} */}
    </>
  )
}


const styles = StyleSheet.create({
  stepsBtnContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  successMsg: {
    color: 'lightgreen',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  failureMsg: {
    color: 'red',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnResult: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '7%',
    height: 50,
    fontSize: 15,
    paddingVertical: 9,
    paddingHorizontal: 40,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'lightgreen',
    marginLeft: 40,
    marginRight: 40,
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
  },
  success: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'lightgreen',
    color: 'lightgreen',
    flex: 1,
  },
  failure: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'blue',
    color: 'blue',
    flex: 1,
  },
  gameOver: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'blue',
    color: 'blue',
    flex: 1,
  },
  answerContainer: {
    overflowX: 'scroll',
  },
  percentage: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  answers: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: '100%',
  },
  tableHeader: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 15,
    backgroundColor: 'blue',
  },
  tableHeaderText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  tableData: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 15,
  },
  btnInfo: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'blue',
    color: 'gray',
    textTransform: 'uppercase',
    borderRadius: 4,
    cursor: 'pointer',
    marginVertical: 0,
    paddingVertical: 9,
    width: '100%',
    fontSize: 15,
    textAlign: 'center',
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { backgroundColor: '#4f78a4', paddingTop: 12, paddingBottom: 12 },
  text: { color: 'white', textTransform: 'uppercase', textAlign: 'center' }
});

export default memo(QuizOver)
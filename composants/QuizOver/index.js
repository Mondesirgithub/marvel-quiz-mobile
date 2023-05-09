/* eslint-disable jsx-a11y/img-redundant-alt */
// import axios from 'axios';
import { useState, memo, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
// import { FaCheckCircle } from 'react-icons/fa';
// import { FaTimesCircle } from 'react-icons/fa'
// import {GiTrophyCup} from 'react-icons/gi'
// import Loader from '../Loader';
// import Modal from '../Modal';

const QuizOver = ({questions , answersUser, score, niveauSuivant,rejouer,recommencer, level}) => {

  const [ouvrirModal, setOuvrirModal] = useState(false)
  const [caracterInfos, setCaracterInfos] = useState([])
  const [loading, setLoading] = useState(true)

  // const bravo = <FaCheckCircle color='green'/>
  // const rate = <FaTimesCircle color='red' />

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
          <TouchableOpacity style={[styles.btnResult, styles.success]} onPress={rejouer}><Text>Rejouer</Text></TouchableOpacity>
          </>
        ) 
        : 
        (
        level < 2 ? (
          <>
          <Text style={styles.successMsg}>Bravo, passez au niveau suivant 😊</Text>
          <TouchableOpacity style={[styles.btnResult, styles.success]} onPress={niveauSuivant}><Text>Niveau suivant</Text></TouchableOpacity>
          </>
        ) 
        : 
        (
          <>
          <Text style={styles.successMsg}>Excéllent, vous avez terminé tout le quiz 😎</Text>
          <TouchableOpacity style={[styles.btnResult, styles.success]} onPress={recommencer}><Text>Recommencez le quizz</Text></TouchableOpacity>
          </>
        )
        )
      }
    </View>
    <View style={styles.percentage}>
      <View style={styles.progressPercent}>Réussite: { score * 10 }%</View>
      <View style={styles.progressPercent}>Note {score}/10</View>
    </View>
    <Text>Les réponses aux questions posées :</Text>
    <View style={[styles.answerContainer, {overflow: 'scroll'}]}>
      <table className='answers'>
        <thead>
          <tr>
            <th>Question</th>
            <th>Réponses</th>
            <th>Vos réponses</th>
            <th>Infos</th>
          </tr>
        </thead>
        <tbody>
          {
            score >= 5 ?
            (Array.isArray(questions) &&
            questions.map(question => {
              return <tr key={question.id}>
                <td>{question.question}</td>
                <td>{question.answer}  </td>
                <td>{answersUser[question.id]} {answersUser[question.id].toString() === question.answer.toString() ? bravo : rate} </td>
                <td>
                  <button onPress={() => afficherModal(question.heroId)} className='btnInfo'>Infos</button>
                </td>
                
              </tr>
            }))
            :
            (
              <tr>
                <td colSpan="4">
                  <p style={{textAlign: 'center', color: 'red'}}>Vous ne pouvez pas voir les réponses ! car vous n'avez pas eu la moyenne</p>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </View>
    {ouvrirModal && resultInModal}
    </>
  )
}


const styles = StyleSheet.create({
  stepsBtnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    flexWrap: 'wrap',
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
    flex: 0.8,
    fontSize: 15,
    textTransform: 'uppercase',
    paddingVertical: 9,
    paddingHorizontal: 40,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'lightgreen',
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default memo(QuizOver)
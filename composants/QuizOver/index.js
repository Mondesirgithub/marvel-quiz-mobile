import axios from 'axios';
import { useState, memo, useEffect, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Button, Image, TouchableHighlight, Linking, Alert } from 'react-native'
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logout from '../Logout';
import Loader from '../Loader';
import Modal from '../Modal';
import { Table, Row } from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../DataContext';


LogBox.ignoreLogs(['Invalid prop textStyle of type array supplied to Cell']);

const QuizOver = ({questions , answersUser, score, niveauSuivant,rejouer,recommencer, level, user}) => {

  const [ouvrirModal, setOuvrirModal] = useState(false)
  const [caracterInfos, setCaracterInfos] = useState([])
  const [loading, setLoading] = useState(true)

    // <td>{question.question}</td>
  //     <td>{question.answer}  </td>
  //     <td>{answersUser[question.id]} {answersUser[question.id].toString() === question.answer.toString() ? bravo : rate} </td>
  //     <td>
  //       <button onPress={() => afficherModal(question.heroId)} className='btnInfo'>Infos</button>
  //     </td>
      
  //   </tr>
  // })) 
  const [tableHead , setTableHead] = useState(['Question', 'Réponse', 'Votre réponse', 'Infos'])
  // (Array.isArray(questions) &&
  // questions.map(question => {
  //   return <tr key={question.id}>

const heroIds = questions.map(item => item.heroId)
const lesQuestions = questions.map(item => item.question)
const lesReponses = questions.map(item => item.answer)
const lesReponsesUser = questions.map(item => answersUser[item.id])

const { args } = useContext(DataContext)


let data = [];


  const [tableData , setTableData] = useState([])

  const bravo = <Icon name="check-circle" color="green" size={20}></Icon>
  const rate = <Icon name="times-circle" color="red" size={20}></Icon>
  const navigation = useNavigation()

  useEffect(() => {
    for (let i = 0; i < lesQuestions.length; i++) {
      let row = [];
      row.push(lesQuestions[i]);
      row.push(lesReponses[i]);
      row.push(<Text style={{textAlign: 'center', marginTop: -10}}>{lesReponsesUser[i]}{"\n"}{lesReponsesUser[i] === lesReponses[i] ? bravo : rate}</Text>);
      row.push(<View style={{marginBottom: 30}}><Button onPress={() => afficherModal(String(heroIds[i]))} title='Infos' color="#4f78a4" /></View>);
      data.push(row);
    }
    setTableData(data)
  }, [])

  const API_PUBLIC_KEY = '3db5f06cfbe71152a2415ce2f0f2de96'
  const hash = 'ab221b7acbc4b8caf1638489c621dfcb'
  
  useEffect(() => {
    const checkStorageDate = async () => {
      try {
        const date = await AsyncStorage.getItem('MarvelStorageDate');
        if (date) {
          checkDataAge(Number(date));
        }
      } catch (error) {
        console.log('Erreur lors de la récupération de la date dans AsyncStorage:', error);
      }
    };

    checkStorageDate();
  }, []);

  const checkDataAge = (date) => {
    const today = Date.now();
    const timeDifference = today - date;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    if (daysDifference >= 15) {
      clearStorage();
      saveStorageDate();
    }
  };

  const afficherModal = async (id) => {
    if(user || args){
      setOuvrirModal(true);
      try {
        const storedData = await AsyncStorage.getItem(id);

        if (!storedData) {
          const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`);
          setCaracterInfos(response.data);
          setLoading(false);

          await AsyncStorage.setItem(id, JSON.stringify(response.data));

          const storageDate = await AsyncStorage.getItem('MarvelStorageDate');
          if (!storageDate) {
            await AsyncStorage.setItem('MarvelStorageDate', Date.now().toString());
          }
        } else {
          setCaracterInfos(JSON.parse(storedData));
          setLoading(false);
        }
      } catch (error) {
        console.log('Erreur :', error);
      }

    }else{
      Alert.alert('Personnages Marvel', 'Veuillez vous connecter pour avoir accès aux infos des personnages Marvel', [
        {
          text: 'Se connecter',
          onPress: () => navigation.navigate('Login', {retour: true}),
          style: 'cancel',
        },
        {
          text: 'Annuler'
        },
      ]);    
    }
  };


  const masquerMoal = () => {
    setOuvrirModal(false)
    setLoading(true)
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase()+string.slice(1)
  }


  const resultInModal = !loading ? (
      <Modal afficherModal={ouvrirModal}>
        <View style={styles.modalHeader}>
          <Text>{caracterInfos.data.results[0].name}</Text>
        </View>
        <View style={styles.modalBody}>
          <View style={styles.comicImage}>            
            <Image
              source={{ uri: `${caracterInfos.data.results[0].thumbnail.path}.${caracterInfos.data.results[0].thumbnail.extension}` }}
              alt={`Image de ${caracterInfos.data.results[0].name}`}
              style={{width: '100%', height: '100%'}}
            />
            <Text>{caracterInfos.attributionText}</Text>
          </View>
          <View style={styles.comicDetails}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 40}}>Description</Text>
            {
              caracterInfos.data.results[0].description ?
              <Text>{caracterInfos.data.results[0].description}</Text>
              : <Text>Description indisponible ...</Text>
            }
            <Text style={{fontWeight: 'bold', fontSize: 20, marginTop: 30}}>Plus d'infos</Text>
            {
              caracterInfos.data.results[0].urls && 
              Array.isArray(caracterInfos.data.results[0].urls) &&
              caracterInfos.data.results[0].urls.map((url, index) =>{
                return <TouchableHighlight key={index} onPress={() => Linking.openURL(url.url)}>
                 <Text> {capitalizeFirstLetter(url.type)}</Text>
                </TouchableHighlight>
              })
            }
          </View>
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.modalBtn} onPress={masquerMoal}><Text>Fermer</Text></TouchableOpacity>
        </View>
    </Modal>
  )
  :
  (
    <>
      <Modal afficherModal={ouvrirModal}>
        <View style={styles.modalHeader}>
        </View>
        <View style={styles.modalBody}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{textAlign: 'center'}}>En attente des informations du site de Marvel ...</Text>
            <Loader />
          </View>
        </View>
        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.modalBtn} onPress={masquerMoal}><Text>Fermer</Text></TouchableOpacity>
        </View>
      </Modal>
    </>
  )




  return (
    <>
    { (user || args) && <Logout/>}
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
    {ouvrirModal && resultInModal}
    </>
  )
}


const styles = StyleSheet.create({
  comicDetails: {
    flex: 0,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '50%',
    alignSelf: 'stretch',
    marginBottom: 120,
    marginTop:170
  },
  modalBtn: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 9,
    paddingHorizontal: 5,
    width: 90,
    color: '#000000',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    margin: 0,
    fontSize: 15,
  },
  modalFooter: {
    backgroundColor: '#ffffff',
    padding: 10,
    color: '#ffffff',
    textAlign: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderColor: '#d3d3d3',
  },
  comicImage: {
    width: 200,
    height: 200,
    marginTop:60,
  },
  modalBody: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: 'white', // Remplacez "#white-color" par la valeur réelle de la couleur blanche
    height:500,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalHeader: {
    backgroundColor: '#4f78a4', // Remplacez "#blue-color" par la valeur réelle de la couleur bleue
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
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
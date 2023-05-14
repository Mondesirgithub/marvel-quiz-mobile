import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Button, ScrollView } from 'react-native';
import Loader from '../Loader'
import Header from '../Header';
  

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  


const ForgetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');
    const [showLoader,setShowLoader] = useState(false)
    const [message, setMessage] = useState('')

    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const [msgEmail, setMsgEmail] = useState('')
  
      useEffect(() => {
        if(email === ''){
          setMsgEmail("L'email est obligatoire")
          setBtn(true)
        }else{
          if(!validateEmail(email)){
            setMsgEmail("L'email n'est pas valide")
            setBtn(true)
          }else{
            setMsgEmail('')
            setBtn(false)
          }
        }
      }, [email])
  
      useEffect(() => {
        setMsgEmail('')
        setError('')
      }, [])

    const errorMsg = error === '' ? null : <span>{error.message}</span>
  
    // const handleShowLoader = () => {
    //   setShowLoader(true)
    // }

  return (
        <ScrollView style={styles.container}>
            <View style={{height: '30%'}}>
              <Header />
            </View>
            <View style={styles.signUpLoginBox}>
                    <View style={styles.slContainer}>
                        <View style={styles.formBoxRight}>
                            <View style={styles.formContent}>
                            {/* {errorMsg} */}
                            <View style={styles.inputBox}>
                                <TextInput 
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                style={styles.myInput}
                                onChangeText={text => setEmail(text)} 
                                value={email} />
                                <Text style={[styles.label, isEmailFocused || email ? styles.labelActive : null]}>Email</Text>
                            </View>
                            <Text style={{color: 'red', textAlign: 'center'}}>{msgEmail}</Text>
                            <Text style={{color: 'red', textAlign: 'center',marginTop: -20}}>{msgEmail}</Text>
                            <Button color='#4f78a4' disabled={!btn} title={showLoader ? 'Chargement...' : 'Récupérer'} />   
                            {
                                showLoader && <Loader Mystyle={{width: '15px', height: '15px'}} />
                            }
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.simpleLink}>Déjà inscrit? Connectez-vous</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
        </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
    },
    signUpLoginBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        width: '100%',
        height: '70%',
    },
    label: {
        color: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
        fontSize: 17,
        pointerEvents: 'none',
      },
      labelActive: {
        top: -30,
        left: 0,
        fontSize: 16,
        fontStyle: 'italic',
      },
    myInput: {
        width: '100%',
        paddingVertical: 10,
        fontSize: 17,
        color: '#4f78a4',
        textTransform: 'none',
        fontWeight: 'bold',
        marginBottom: 30,
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
      },
    slContainer: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '80%',
    },
    formBoxLeftLogin: {
        minHeight: 500,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '50%'
    },
    formBoxRight: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '50%'
    },
    formContent: {
        width: '100%',
        padding: 20,
        boxSizing: 'border-box',
    },
    inputBox: {
        position: 'relative',
        height: 80,
        marginTop: 30
    },
    simpleLink: {
        color: 'white',
        textDecorationLine: 'none',
        fontSize: 12,
        marginTop: 30
    },

});


export default ForgetPassword
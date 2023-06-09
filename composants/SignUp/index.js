/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import Header from '../Header';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { setDoc } from 'firebase/firestore';
import { user } from '../Firebase/firebase';
import Loader from '../Loader';
import { DataContext } from '../../DataContext';

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


const SignUp = ({navigation, route}) => {
  
  const [pseudo, setPseudo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [champsValides, setChampsValides] = useState(false)
  const [error, setError] = useState('')
  const [showLoader,setShowLoader] = useState(false)
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isPseudoFocused, setIsPseudoFocused] = useState(false);

  const [msgPseudo, setMsgPseudo] = useState('')
  const [msgEmail, setMsgEmail] = useState('')
  const [msgPassword, setMsgPassword] = useState('')
  const [msgConfirmPassword, setMsgConfirmPassword] = useState('')

  useEffect(() => {
    if(pseudo !== '' && email !== '' && validateEmail(email) && password !== '' && password === confirmPassword){
      setChampsValides(true)
    }else{
      setChampsValides(false)
    }
    // eslint-disable-next-line
  }, [pseudo,email,password,confirmPassword])

  useEffect(() => {
    if(pseudo === ''){
      setMsgPseudo('Le pseudo est obligatoire')
    }else{
      setMsgPseudo('')
    }
  }, [pseudo])


  useEffect(() => {
    if(email === ''){
      setMsgEmail('L\'email est obligatoire')
    }else{
      if(!validateEmail(email)){
        setMsgEmail('L\'email n\'est pas valide')
      }else{
        setMsgEmail('')
      }
    }
  }, [email])

  useEffect(() => {
    if(password === ''){
      setMsgPassword('Le mot de passe est obligatoire')
    }else{
      setMsgPassword('')
    }
  }, [password])

  useEffect(() => {
    if(confirmPassword !== password){
      setMsgConfirmPassword("Les mots de passe ne correspondent pas")
    }else{
      setMsgConfirmPassword('')
    }
  }, [confirmPassword, password])

  useEffect(() => {
    setMsgEmail('')
    setMsgPseudo('')
    setMsgPassword('')
    setMsgConfirmPassword('')
  }, [])


  // gestion erreurs
  const errorMsg = error === '' ? null : <Text style={styles.msgError}>{error.message}</Text>

  const { setArgs } = useContext(DataContext)

  const handleShowLoader = () => {
    setShowLoader(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then( authUser => {        
        return setDoc(user(authUser.user.uid), {
            pseudo,
            email
        });
    })
    .then(authUser => {
        //ToastAndroid.showWithGravity(String(`Salut et bonne chance 😉`), ToastAndroid.LONG, ToastAndroid.TOP_RIGHT)
        
        navigation.replace('Quiz', {user: true}); 
        
        setError('')
        setPseudo('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    })
    .catch(error => {
      setError({
        ...error,
        message : 'Une erreur s\'est produite, soit l\'utilisateur existe déjà soit votre connexion internet est instable'
      });
      console.log(error)
      setShowLoader(false)
    })
  }

  return (
        <ScrollView style={styles.container}>
          <View style={{height: '15%'}}>
            <Header />
          </View>
            <View style={styles.signUpLoginBox}>
                    <View style={styles.slContainer}>
                        <View style={styles.formBoxRight}>
                              <View style={styles.formContent}>
                              {errorMsg}
                              <View style={styles.inputBox}>
                                  <TextInput 
                                  onFocus={() => setIsPseudoFocused(true)}
                                  onBlur={() => setIsPseudoFocused(false)}
                                  style={styles.myInput}
                                  onChangeText={text => setPseudo(text)} 
                                  value={pseudo} />
                                  <Text style={[styles.label, isPseudoFocused || pseudo ? styles.labelActive : null]}>Pseudo</Text>
                                  <Text style={{color: 'red', textAlign: 'center', marginTop: -20}}>{msgPseudo}</Text>
                              </View>
                              <View style={styles.inputBox}>
                                  <TextInput 
                                  onFocus={() => setIsEmailFocused(true)}
                                  onBlur={() => setIsEmailFocused(false)}
                                  style={styles.myInput}
                                  onChangeText={text => setEmail(text)} 
                                  value={email} />
                                  <Text style={[styles.label, isEmailFocused || email ? styles.labelActive : null]}>Email</Text>
                                  <Text style={{color: 'red', textAlign: 'center',marginTop: -20}}>{msgEmail}</Text>
                              </View>
                              <View style={styles.inputBox}>
                                  <TextInput 
                                  style={styles.myInput}
                                  onChangeText={text => setPassword(text)}
                                  value={password}
                                  onFocus={() => setIsPasswordFocused(true)}
                                  onBlur={() => setIsPasswordFocused(false)} />
                                  <Text style={[styles.label, isPasswordFocused || password ? styles.labelActive : null]}>Mot de passe</Text>
                                  <Text style={{color: 'red', textAlign: 'center',marginTop: -20}}>{msgPassword}</Text>
                              </View>
                              <View style={styles.inputBox}>
                                  <TextInput 
                                    style={styles.myInput}
                                    onChangeText={text => setConfirmPassword(text)}
                                    value={confirmPassword}
                                    onFocus={() => setIsConfirmPasswordFocused(true)}
                                    onBlur={() => setIsConfirmPasswordFocused(false)} />
                                  <Text style={[styles.label, isConfirmPasswordFocused || confirmPassword ? styles.labelActive : null]}>Confirmez le mot de passe</Text>
                                  <Text style={{color: 'red', textAlign: 'center',marginTop: -20}}>{msgConfirmPassword}</Text>
                              </View>
                              <Button color='#4f78a4' onPress={handleShowLoader} disabled={!champsValides} title={showLoader ? 'Chargement...' : 'Inscription'} />   
                              {
                                  showLoader && <Loader />
                              }
                              <TouchableOpacity style={{marginBottom: 50}} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.simpleLink}>Déjà inscrit ? connectew-vous{"\n"}</Text>
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
    height: '100%'
  },
  signUpLoginBox: {
      justifyContent: 'center',
      width: '100%',
      height: '80%',
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
      flexBasis: '50%',
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
      fontSize: 12,
      marginTop: 30,
      marginBottom: 30
  },
  msgError: {
    color: 'red',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 0,
  },

});

export default SignUp
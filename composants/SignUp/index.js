/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Button, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import Header from '../Header';

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


const SignUp = ({navigation}) => {
  
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
    if(pseudo !== '' && email !== '' && password !== '' && password === confirmPassword){
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
      setMsgEmail('')
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

  const handlePseudo = e => {
    setPseudo(e.target.value)
  }
  
  const handleEmail = e => {
    setEmail(e.target.value)
  }
  
  const handlePassword = e => {
    setPassword(e.target.value)
  }
  
  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value)
  }

  // gestion erreurs
  const errorMsg = error === '' ? null : (<span>{error.message}</span>);
  const handleShowLoader = () => {
    setShowLoader(true)
  }

  return (
        <ScrollView style={styles.container}>
          <View style={{height: '20%'}}>
            <Header />
          </View>
            <View style={styles.signUpLoginBox}>
                    <View style={styles.slContainer}>
                        <View style={styles.formBoxRight}>
                            <View style={styles.formContent}>
                            {/* {errorMsg} */}
                            <View style={styles.inputBox}>
                                <TextInput 
                                onFocus={() => setIsPseudoFocused(true)}
                                onBlur={() => setIsPseudoFocused(false)}
                                style={styles.myInput}
                                onChangeText={text => setPseudo(text)} 
                                value={pseudo} />
                                <Text style={[styles.label, isPseudoFocused || pseudo ? styles.labelActive : null]}>Pseudo</Text>
                                <Text style={{color: 'red', textAlign: 'center'}}>{msgPseudo}</Text>
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput 
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                style={styles.myInput}
                                onChangeText={text => setEmail(text)} 
                                value={email} />
                                <Text style={[styles.label, isEmailFocused || email ? styles.labelActive : null]}>Email</Text>
                                <Text style={{color: 'red', textAlign: 'center'}}>{msgEmail}</Text>
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput 
                                style={styles.myInput}
                                onChangeText={text => setPassword(text)}
                                value={password}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)} />
                                <Text style={[styles.label, isPasswordFocused || password ? styles.labelActive : null]}>Mot de passe</Text>
                                <Text style={{color: 'red', textAlign: 'center'}}>{msgPassword}</Text>
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput 
                                  style={styles.myInput}
                                  onChangeText={text => setConfirmPassword(text)}
                                  value={confirmPassword}
                                  onFocus={() => setIsConfirmPasswordFocused(true)}
                                  onBlur={() => setIsConfirmPasswordFocused(false)} />
                                <Text style={[styles.label, isConfirmPasswordFocused || confirmPassword ? styles.labelActive : null]}>Confirmez le mot de passe</Text>
                                
                                <Text style={{color: 'red', textAlign: 'center'}}>{msgConfirmPassword}</Text>
                            </View>
                            <Button color='#4f78a4' disabled={!champsValides} title={showLoader ? 'Chargement...' : 'Inscription'} />   
                            {
                                showLoader && <Loader Mystyle={{width: '15px', height: '15px'}} />
                            }
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  signUpLoginBox: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
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
      color: 'blue',
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
      display: 'flex'
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
  },

  simpleLink: {
      color: 'white',
      textDecorationLine: 'none',
      fontSize: 12,
  },

});

export default SignUp
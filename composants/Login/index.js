import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Button, ScrollView } from 'react-native';
import { auth } from '../Firebase/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import Loader from '../Loader'
import Header from '../Header';

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  


const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('');
    const [showLoader,setShowLoader] = useState(false)

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [msgEmail, setMsgEmail] = useState('')
    const [msgPassword, setMsgPassword] = useState('')

    useEffect(() => {
        if(email !== '' && validateEmail(email) && password !== '' && password.length >= 6){
          setBtn(true)
        }else{
          setBtn(false)
        }
        // eslint-disable-next-line
      }, [email,password])
    
      useEffect(() => {
        if(email === ''){
          setMsgEmail("L'email est obligatoire")
        }else{
          if(!validateEmail(email)){
            setMsgEmail("L'email n'est pas valide")
          }else{
            setMsgEmail('')
          }
        }
      }, [email])
  
      useEffect(() => {
        if(password === ''){
          setMsgPassword("Le mot de passe est obligatoire")
        }else{
          if(password.length < 6){
            setMsgPassword("Le mot de passe doit être supérieur à 6 caractères")
          }else{
          setMsgPassword('')
          }
        }
      }, [password])
  
      useEffect(() => {
        setMsgEmail('')
        setMsgPassword('')
        setError('')
      }, [])


    const handleShowLoader = () => {
      setShowLoader(true)

        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
              navigation.replace('Quiz', { user: user });
              ToastAndroid.showWithGravity(`Salut ${user.email} et bonne chance 😉`, ToastAndroid.LONG, ToastAndroid.TOP_RIGHT)
              setError('')
              setEmail('');
              setPassword('');
        })
        .catch(error => {
            setError({
              ...error,
              message : 'Mot de passe et/ou adresse email incorrect(s), réessayer !'
            });
            setShowLoader(false)
        })
    }

    const errorMsg = error === '' ? null : <Text style={styles.msgError}>{error.message}</Text>
  


  return (
        <ScrollView style={styles.container}>
            <View style={{height: '20%'}}>
              <Header />
            </View>
            <View style={styles.signUpLoginBox}>
                    <View style={styles.slContainer}>
                        <View style={styles.formBoxRight}>
                            <View style={styles.formContent}>
                            {errorMsg}
                            <View style={styles.inputBox}>
                                <TextInput 
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                style={styles.myInput}
                                onChangeText={text => setEmail(text)} 
                                value={email} />
                                <Text style={[styles.label, isEmailFocused || email ? styles.labelActive : null]}>Email</Text>
                            </View>
                            <Text style={{color: 'red', textAlign: 'center',marginTop: -20}}>{msgEmail}</Text>
                            <View style={styles.inputBox}>
                                <TextInput 
                                style={styles.myInput}
                                onChangeText={text => setPassword(text)}
                                value={password}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)} />
                                <Text style={[styles.label, isPasswordFocused || password ? styles.labelActive : null]}>Mot de passe</Text>
                            </View>
                            <Text style={{color: 'red', textAlign: 'center',marginTop: -20}}>{msgPassword}</Text>
                            <Button color='#4f78a4' onPress={handleShowLoader} disabled={!btn} title={showLoader ? 'Chargement...' : 'Connexion'} />   
                            {
                                showLoader && <Loader Mystyle={{width: '15px', height: '15px'}} />
                            }
                      
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.simpleLink}>Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.{"\n"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                                <Text style={[styles.simpleLink, {marginTop: -5, marginBottom: 50}]}>Mot de passe oublié ?</Text>
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
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    signUpLoginBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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


export default Login
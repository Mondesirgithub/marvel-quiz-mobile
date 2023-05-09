import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Button, ScrollView } from 'react-native';
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
    const [message, setMessage] = useState('')

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [msgEmail, setMsgEmail] = useState('')
    const [msgPassword, setMsgPassword] = useState('')
  
    useEffect(() => {
        if(email !== '' && password !== ''){
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
          setMsgEmail('')
        }
      }, [email])
  
      useEffect(() => {
        if(password === ''){
          setMsgPassword("Le mot de passe est obligatoire")
        }else{
          setMsgPassword('')
        }
      }, [password])
  
      useEffect(() => {
        setMsgEmail('')
        setMsgPassword('')
        setError('')
      }, [])
    const errorMsg = error === '' ? null : <span>{error}</span>
  
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
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                style={styles.myInput}
                                onChangeText={text => setEmail(text)} 
                                value={email} />
                                <Text style={[styles.label, isEmailFocused || email ? styles.labelActive : null]}>Email</Text>
                            </View>
                            <Text style={{color: 'red', textAlign: 'center'}}>{msgEmail}</Text>
                            <View style={styles.inputBox}>
                                <TextInput 
                                style={styles.myInput}
                                onChangeText={text => setPassword(text)}
                                value={password}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)} />
                                <Text style={[styles.label, isPasswordFocused || password ? styles.labelActive : null]}>Mot de passe</Text>
                            </View>
                            <Text style={{color: 'red', textAlign: 'center'}}>{msgPassword}</Text>
                            <Button color='#4f78a4' disabled={!btn} title={showLoader ? 'Chargement...' : 'Connexion'} />   
                            {
                                showLoader && <Loader Mystyle={{width: '15px', height: '15px'}} />
                            }
                            <Text style={{color: 'red', textAlign: 'center'}}>{message}</Text>
                        
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={styles.simpleLink}>Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant.{"\n"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.simpleLink}>Mot de passe oublié ?</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
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


export default Login
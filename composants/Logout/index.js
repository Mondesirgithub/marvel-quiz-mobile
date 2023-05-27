import React, { useState, useEffect, useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { Switch, View,StyleSheet,Text, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../../DataContext';

const Logout = () => {

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('')
    const navigation = useNavigation();
    const {setArgs} = useContext(DataContext)

    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {
                setArgs(null)
                ToastAndroid.showWithGravity(
                    String("Déconnexion réussie !"),
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP, // Utilisez TOP pour la gravité en haut
                    ToastAndroid.RIGHT // Utilisez RIGHT pour la gravité à droite
                  );
                  
                  navigation.replace("Home")
            }).catch((error) => {
                setError(error)
                console.log("ERROR => ", error)
            });
        }
    }, [checked]);

    const handleChange = value => {
        setChecked(value);
    }


    return (
        <View className="logoutContainer">
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={{marginLeft:'60%', marginTop: 1, marginRight:5, marginBottom: 0}}>Déconnexion</Text>
                <View style={styles.switch}>
                    <Switch
                        value={checked}
                        onValueChange={handleChange}
                    />
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    switch: {
      position: 'absolute',
      top: 0,
      right: 0,
      marginTop: -15,
    },
  });

export default React.memo(Logout)

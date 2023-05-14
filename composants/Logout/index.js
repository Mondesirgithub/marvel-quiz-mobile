import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { Switch, View,StyleSheet,Text } from 'react-native';


const Logout = ({navigation}) => {

    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        if (checked) {
            signOut(auth).then(() => {
                navigation.replace('Landing')
            }).catch((error) => {
                setError(error)
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

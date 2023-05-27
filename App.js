import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Lading from './composants/Lading';
import Login from './composants/Login';
import Quiz from './composants/Quiz';
import ForgetPassword from './composants/ForgetPassword'
import SignUp from './composants/SignUp';
import QuizOver from './composants/QuizOver';
import { DataContext } from './DataContext';
import { useState } from 'react';


const Stack = createNativeStackNavigator();

export default function App() {
  const [args , setArgs] = useState(null)

  return (
    <DataContext.Provider value={{args, setArgs}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Lading}
          options={{
            title: 'Bienvenue'
          }}
        />
        <Stack.Screen name="Login" component={Login} options={{title: 'Connexion'}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{title: 'Inscription'}} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{title: 'Mot de passe oublié'}} />
        <Stack.Screen name="Quiz" component={Quiz} options={{title: 'Quiz'}}/>
        <Stack.Screen name="QuizOver" component={QuizOver} options={{title: 'Quiz'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </DataContext.Provider>
  );
}

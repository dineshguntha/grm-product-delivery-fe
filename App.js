import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './src/HomeScreen';
import DetailsScreen from './src/DetailsScreen';
import HelloWorld from './src/HelloWorld';
import LoginScreen from './src/Login';
import EntityList from './src/entity/EntityList';
import CreateEntity from './src/entity/CreateEntity';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="EntityList" component={EntityList} />
       <Stack.Screen name="Home" component={HomeScreen} />
      
       <Stack.Screen name="EntityCreate" component={CreateEntity} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}



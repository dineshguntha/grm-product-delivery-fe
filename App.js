import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/Login';
import EntityList from './src/entity/EntityList';
import CreateEntity from './src/entity/CreateEntity'
import EditEntity from './src/entity/EditEntity';
import UsernameForm from './src/user/UserPage';
import UserList from './src/user/UserList';
import EditUser from './src/user/EditUser';
import CreateProduct from './src/product/createproduct';
import EditProduct from './src/product/editproduct';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
  
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}
         options={{
          headerStyle: {
            backgroundColor: '#003f88', // Change this to your desired color
          },
          headerTintColor: 'white', // Change the text color if needed
        }} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name="EntityList" component={EntityList} 
        options={{
          headerStyle: {
            backgroundColor: '#003f88', // Change this to your desired color
          },
          headerTintColor: 'white', // Change the text color if needed
        }}
        />
        <Stack.Screen name="EditUser"  component={EditUser}
         options={{
          headerStyle: {
            backgroundColor: '#003f88', // Change this to your desired color
          },
          headerTintColor: 'white', // Change the text color if needed
        }}
        
        />
        <Stack.Screen name="EditEntity" component={EditEntity}
        options={{
          headerStyle: {
            backgroundColor: '#003f88', // Change this to your desired color
          },
          headerTintColor: 'white', // Change the text color if needed
        }}
        />
       <Stack.Screen name="Home" component={HomeScreen} 
       options={{
        headerStyle: {
          backgroundColor: '#003f88', // Change this to your desired color
        },
        headerTintColor: 'white', // Change the text color if needed
      }}
       />
       <Stack.Screen name="UserList" component={UserList}
       options={{
        headerStyle: {
          backgroundColor: '#003f88', // Change this to your desired color
        },
        headerTintColor: 'white', // Change the text color if needed
      }}
       />
       <Stack.Screen name="UserPage" component={UsernameForm}
       options={{
        headerStyle: {
          backgroundColor: '#003f88', // Change this to your desired color
        },
        headerTintColor: 'white', // Change the text color if needed
      }}/>
      <Stack.Screen name="EntityCreate" component={CreateEntity} 
      options={{
        headerStyle: {
          backgroundColor: '#003f88', // Change this to your desired color
        },
        headerTintColor: 'white', // Change the text color if needed
      }}/>
      <Stack.Screen name="CreateProduct" component={CreateProduct}
       options={{
        headerStyle: {
          backgroundColor: '#003f88', // Change this to your desired color
        },
        headerTintColor: 'white', // Change the text color if needed
      }}/>
        <Stack.Screen name="EditProduct" component={EditProduct}
       options={{
        headerStyle: {
          backgroundColor: '#003f88', // Change this to your desired color
        },
        headerTintColor: 'white', // Change the text color if needed
      }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}



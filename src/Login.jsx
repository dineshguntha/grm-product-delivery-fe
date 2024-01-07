import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Here you would implement actual authentication logic
    // For this example, let's just print the email and password
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('Home');
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Button title="Login" onPress={() => handleLogin()} />
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark gray text color
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white', // White input background
  },
  forgotPassword: {
    fontSize: 16,
    color: '#555', // Medium gray text color
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

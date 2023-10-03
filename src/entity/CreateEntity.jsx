import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveEntitty } from '../services/Constants';

function CreateEntity({ navigation }) {
  const [name, setName] = useState('');
  const [gst, setGst] = useState(null);
  const [account, setAccount] = useState(null);


  const handleSubmit = () => {
    // Create an object with the data to be sent to the API
    const entityData = {
      name,
      gst,
      accountNumber: account,
    };

    // Define the URL of your API
    // const apiUrl = 'http:// 192.168.43.186:8080/entity/save'; // Replace with your actual API URL
     console.log("url",entityData,saveEntitty);
    // Make a POST request to the API
    fetch(saveEntitty, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers such as authentication headers
      },
      body: JSON.stringify(entityData), // Convert the data to JSON format
    })
      .then((response) => {
        console.log("Response", response);
        if (!response.ok) {
          // Handle error responses here
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response data as JSON
      })
      .then((responseData) => {
        // Handle the successful response from the API here
        console.log('Response from API:', responseData);

        // Show an alert for successful submission
        Alert.alert('Success', 'Entity has been created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('EntityList');
              
              // Do nothing or add any additional logic if needed
            },
          },
        ]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Entity</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>GST:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter GST"
          value={gst}
          onChangeText={(text) => setGst(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Account:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account"
          value={account}
          onChangeText={(text) => setAccount(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          onPress={handleSubmit}
          color="#007bff" // Premium blue color
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View"
          onPress={() => navigation.navigate('EntityList')}
          color="#007bff" // Premium blue color
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background color
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333', // Text color
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18, // Increased font size
    marginBottom: 5,
    color: 'black', // Premium blue color
    fontWeight: 'bold', // Bold font weight
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white', // White background for input
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default CreateEntity;

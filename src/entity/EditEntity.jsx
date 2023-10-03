import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { findAllEntity, update } from '../services/Constants';

function EditEntity({ route, navigation }) {
  const { entityId } = route.params;
  const [name, setName] = useState('');
  const [gst, setGst] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Fetch entity details by entityId and populate the state
  const fetchEntityDetails = async () => {
    try {
      const response = await fetch(findAllEntity); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const entityData = data.find((entity) => entity.id === entityId);
      if (entityData) {
        setName(entityData.name);
        setGst(entityData.gst);
        setAccountNumber(entityData.accountNumber);
      }
    } catch (error) {
      console.error('Error fetching entity details:', error);
    }
  };

  // Call fetchEntityDetails when the component mounts
  useEffect(() => {
    fetchEntityDetails();
  }, []);

  const handleSave = async () => {
    console.log('updated data:', name, gst, accountNumber);
    try {
      // Send edited data to the server
      await fetch(update, {
        method: 'PUT',
        body: JSON.stringify({ id: entityId, name, gst, accountNumber }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Navigate back to the EntityList page after saving
      navigation.navigate('EntityList');
    } catch (error) {
      console.error('Error saving entity details:', error);
    }
  };

  const handleCancel = () => {
    // Navigate back to the EntityList page without saving changes
    navigation.navigate('EntityList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Entity</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="GST"
        value={gst}
        onChangeText={(text) => setGst(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={(text) => setAccountNumber(text)}
      />
      <View style={{marginVertical: 10}}>
      <Button title="Save" onPress={handleSave} />
      </View>
      <View style={{marginVertical: 10}}>
      <Button title="Cancel" onPress={handleCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // White background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Text color
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20, // Increased margin for better spacing
  },
});

export default EditEntity;


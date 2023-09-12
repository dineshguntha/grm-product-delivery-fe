import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { findAllEntity, update } from '../services/Constants';

function EditEntity({ route, navigation }) {
  const { entityId } = route.params;
  const [name, setName] = useState('');
  const [gst, setGst] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Fetch entity details by entityId and populate the state
  // This code depends on your API structure
  // You may need to create a fetchEntityById function
  // and replace it with your actual API call
  const fetchEntityDetails = async () => {
    try {
      // Fetch entity details based on entityId
      const response = await fetch(findAllEntity);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setName(data.name);
      setGst(data.gst);
      setAccountNumber(data.accountNumber);
    } catch (error) {
      console.error('Error fetching entity details:', error);
    }
  };

  // Call fetchEntityDetails when the component mounts
  React.useEffect(() => {
    fetchEntityDetails();
  }, []);

  const handleSave = async () => {
    try {
      // Send edited data to the server
      await fetch(update, {
        method: 'PUT',
        body: JSON.stringify({ name, gst, accountNumber }),
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
      <Text>Edit Entity</Text>
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
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={handleCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default EditEntity;

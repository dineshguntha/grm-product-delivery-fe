import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateuser, userlist } from '../services/Constants';

function EditUser({ route, navigation }) {
  const { userId } = route.params;

  const [userData, setUserData] = useState({
    loginName: '',
    emailId: '',
    roles: '',
    entityName: '',
    routeName: '',
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch(userlist); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const user = data.find((user) => user.userId === userId);
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await fetch(`${updateuser}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User</Text>
      <TextInput
        style={styles.input}
        placeholder="Login Name"
        value={userData.loginName}
        onChangeText={(text) => setUserData({ ...userData, loginName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userData.emailId}
        onChangeText={(text) => setUserData({ ...userData, emailId: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Roles"
        value={userData.roles}
        onChangeText={(text) => setUserData({ ...userData, roles: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Entity Name"
        value={userData.entityName}
        onChangeText={(text) => setUserData({ ...userData, entityName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Route Name"
        value={userData.routeName}
        onChangeText={(text) => setUserData({ ...userData, routeName: text })}
      />
      <View style={{ marginVertical: 10 }}>
        <Button title="Save" onPress={handleSave} />
      </View>
      <View style={{ marginVertical: 10 }}>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default EditUser;

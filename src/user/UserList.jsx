import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';
import { deluser, userlist } from '../services/Constants';

function UserList({ navigation }) {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(userlist);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteItem = async (userId) => {
    console.log("userId", userId);
    try {
      await fetch(`${deluser}/${userId}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const renderListItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.nameText}>Login: {item.loginName}</Text>
          <Text style={styles.nameText}>Email: {item.emailId}</Text>
          <Text style={styles.nameText}>Role: {item.roles}</Text>
          <Text style={styles.nameText}>Enity Name: {item.entityName}</Text>
          <Text style={styles.nameText}>Route: {item.routeName}</Text>

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditUser', { userId: item.userId })}
          >
            <FontAwesome5 name="edit" size={20} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item.userId)}
          >
            <FontAwesome5 name="trash-alt" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('UserPage')}
      >
        <AntDesign name="adduser" size={24} color="green" />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Premium white background
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: '#333', // Text color
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 12,
    marginBottom: 100,
  },
  deleteButton: {
    marginLeft: 8,
    marginBottom: 100,
  },
  createButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
});

export default UserList;

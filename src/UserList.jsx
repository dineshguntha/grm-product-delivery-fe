// userlist.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity, } from 'react-native';
import axios from 'axios'; // Import Axios
import Icon from 'react-native-vector-icons/FontAwesome';
import { userlist } from './services/Constants';

const UserList = ({navigation}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Perform a GET request to fetch the list of users using Axios
    axios.get(userlist)
      .then((response) => {
        // Assuming the response data is in the form of an array of users
        const responseData = response.data;
        setUsers(responseData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const renderListItem = ({ item }) => (
    <View style={styles.itemContainer}>
          <View style={styles.userItem}>
            <Text>FirstName:{item.firstName}</Text>                     
            <Text>MiddleName:{item.middleName}</Text>
            <Text>LastName:{item.lastName}</Text>
            <Text>Login:{item.login}</Text>
            <Text>Password:{item.password}</Text>
            <Text>Email:{item.email}</Text>
            <Text>PhoneNumber:{item.phoneNumber}</Text>
            <Text>SelectedRole:{item.selectedRole}</Text>
            <Text>EntityName:{item.entityName}</Text>
            <Text>RouteName:{item.routeName}</Text>
            {/* Add more user details as needed */}
          </View>
          </View>
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('UserPage')} 
      >
        <Icon name="user-plus" size={20} color="blue"
          style={{ fontWeight: 'bold', backgroundColor: 'white', borderRadius: 8 }}
          />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>UserList</Text>
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
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

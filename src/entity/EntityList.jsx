import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library you prefer
import { deletetById, findAllEntity } from '../services/Constants';

function EntityList({ navigation }) {
  const [entityListData, setEntityListData] = useState([]);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch(findAllEntity); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEntityListData(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const renderListItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.nameText}>Name: {item.name}</Text>
          <Text style={styles.gstText}>GST: {item.gst}</Text>
          <Text style={styles.accountText}>Account: {item.accountNumber}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditEntity', { entityId: item.id })}
          >
            <Icon name="pencil" size={20} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item.id)}
          >
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Function to handle item deletion
  const handleDeleteItem = async (entityId) => {
    try {
      // Perform the delete operation on the server using the entityId
      // After successful deletion, you can update the state or refresh the data as needed.
      // Example:
      await fetch(`${deletetById}/${entityId}`, {
        method: 'DELETE',
      });
      // Fetch data again to update the list
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('EntityCreate')}
      >
        <Icon name="plus" size={20} color="green" />
      </TouchableOpacity>
      <Text style={styles.pageTitle}>EntityList</Text>
      <FlatList
        data={entityListData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderListItem}
      />
    </View>
  );
}

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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gstText: {
    fontSize: 16,
    color: 'green',
  },
  accountText: {
    fontSize: 16,
    color: 'blue',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginRight: 4,
  },
  createButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
  },
});

export default EntityList;


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Entypo } from '@expo/vector-icons';
import { fetchALlEnitites } from '../services/EntityService';

function EntityList({ navigation }) {
  const [entityListData, setEntityListData] = useState([]);

  

  // useEffect(async() => {
  //   setEntityListData(await fetchALlEnitites());
  // }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchALlEnitites();
        setEntityListData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
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
            <FontAwesome5 name="edit" size={20} color="#007bff" />{/* Replace with FontAwesome5 icon */}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item.id)}
          >
            <FontAwesome5 name="trash-alt" size={20} color="red" />{/* Replace with FontAwesome5 icon */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleDeleteItem = async (entityId) => {
    try {
      await fetch(`${deletetById}/${entityId}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity
  style={styles.createButton}
  onPress={() => navigation.navigate('EntityCreate')}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Entypo name="add-to-list" size={24} color="green" />
  </View>
</TouchableOpacity>
<Text style={styles.pageTitle}>Entity List</Text>
      <FlatList
        data={entityListData}
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
    alignItems: 'center',
  },
  editButton: {
    marginRight: 12,
    marginBottom:45,
  },
  deleteButton: {
    marginLeft: 8,
    marginBottom:45,
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

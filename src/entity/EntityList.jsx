import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

function EntityList({ navigation }) {
  const [entityListData, setEntityListData] = useState([]);

  // Function to fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.43.186:8080/entity/findAll'); // Replace with your API endpoint
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

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Create"
          onPress={() => navigation.navigate('EntityCreate')}
        />
      </View>
      <View>
        <Text style={styles.pageTitle}>Entity List</Text>
        <FlatList
          data={entityListData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.nameText}>Name: {item.name}</Text>
              <Text style={styles.gstText}>GST: {item.gst}</Text>
              <Text style={styles.accountText}>Account: {item.accountNumber}</Text>
              {/* Add styling or additional components as needed */}
            </View>
          )}
        />
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        {/* Content for the main page */}
        <Text>Main Page Content Goes Here</Text>
        <Button
          title="Click Me"
          onPress={() => {
            alert('Button Clicked!');
            navigation.navigate('Home');
          }}
        />
      </View>
      {/* <SubPage /> Render the nested subpage */}
    </>
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
});

export default EntityList;

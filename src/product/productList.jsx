import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import axios from 'axios';
import { productlist } from '../services/Constants';

function ProductListPage({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch existing data using a GET request
    axios
      .get(productlist)
      .then((response) => {
        // Extract the relevant data (entityName, routeName, username)
        const formattedData = response.data.map((item) => ({
          entityName: item.entityName,
          routeName: item.routeName,
          username: item.username,
          id: item.id, // Ensure each item has a unique identifier
        }));
        setProducts(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const totalProductsCount = products.length;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Product List</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateProduct')}
        >
          <FontAwesome5 name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.totalProducts}>Total Products: {totalProductsCount}</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.productInfo}>Entity Name: {item.entityName}</Text>
            <Text style={styles.productInfo}>Route Name: {item.routeName}</Text>
            <Text style={styles.productInfo}>UserName: {item.username}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalProducts: {
    fontSize: 18,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  productInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ProductListPage;

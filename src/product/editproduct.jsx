import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from 'react-native-web';
import { updateProduct, getProductById, productlist, updateProducts } from '../services/Constants';

function EditProduct({ route, navigation }) {
  const { productId } = route.params;

  const [skuName, setSkuName] = useState('');
  const [originalCost, setOriginalCost] = useState('');
  const [sellingCost, setSellingCost] = useState('');
  const [categoryType, setCategoryType] = useState('');

  useEffect(() => {
    // Check if productId is valid before making the request
    if (productId) {
      // Fetch the product data by ID
      axios
        .get(productlist) // Assuming the productId is part of the URL
        .then((response) => {
          const productData = response.data;
          
          // Update state with the fetched data
          setSkuName(productData.skuName);
          setOriginalCost(productData.originalCost);
          setSellingCost(productData.sellingCost);
          setCategoryType(productData.categoryType);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }
  }, [productId]);

  const updateProductData = () => {
    // Prepare the updated data to send to the server
    const updatedData = {
      skuName,
      originalCost,
      sellingCost,
      categoryType,
    };

    axios
      .put(updateProducts, updatedData)
      .then((response) => {
        // Handle a successful response from the server
        console.log('Product updated successfully:', response.data);
        navigation.goBack(); // Navigate back to the previous screen after updating
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating product:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SKU Name</Text>
      <TextInput
        style={styles.input}
        placeholder="SKU Name"
        value={skuName}
        onChangeText={(text) => setSkuName(text)}
      />

      <Text style={styles.label}>Original Cost</Text>
      <TextInput
        style={styles.input}
        placeholder="Original Cost"
        value={originalCost}
        onChangeText={(text) => setOriginalCost(text)}
      />

      <Text style={styles.label}>Selling Cost</Text>
      <TextInput
        style={styles.input}
        placeholder="Selling Cost"
        value={sellingCost}
        onChangeText={(text) => setSellingCost(text)}
      />

      <Text style={styles.label}>Category Type</Text>
      <TextInput
        style={styles.input}
        placeholder="Category Type"
        value={categoryType}
        onChangeText={(text) => setCategoryType(text)}
      />

      <TouchableOpacity onPress={updateProductData} style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default EditProduct;

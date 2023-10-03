import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Picker } from 'react-native-web';
import { createproduct, deleteProduct, productlist } from '../services/Constants';
import { fetchALlEnitites } from '../services/EntityService';

function CreateProduct({navigation}) {
  const [entityName, setEntityName] = useState('');
  const [routeName, setRouteName] = useState('');
  const [username, setUsername] = useState('');
  const [showAccordion, setShowAccordion] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    skuName: '',
    originalCost: '',
    sellingCost: '',
    categoryType: '',
  });
  const[entity,setEntity]=useState([]);

  useEffect(() => {
    if (showAccordion) {
      // Fetch existing data using a GET request
      axios
        .get(productlist)
        .then((response) => {
          // Extract the relevant data (skuName, originalCost, sellingCost)
          const formattedData = response.data.map((item) => ({
            skuName: item.products[0].skuName,
            originalCost: item.products[0].originalCost,
            sellingCost: item.products[0].sellingCost,
            categoryType: item.products[0].categoryType,
            id: item.id, // Ensure each item has a unique identifier
          }));
          setProducts(formattedData);
          console.log('product',formattedData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [showAccordion]);

  const toggleAccordion = () => {
    setShowAccordion(!showAccordion);
  };

  const addProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({
      skuName: '',
      originalCost: '',
      sellingCost: '',
      categoryType: '',
    });
  };
  const saveDetails = () => {
    // Prepare the data to send to the server
    const dataToSend = {
      entityName,
      routeName,
      username,
      products,
    };


    axios
      .post(createproduct, dataToSend)
      .then((response) => {
        // Handle a successful response from the server
        console.log('Data sent successfully:', response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error sending data:', error);
      });
  };


  const deleteProductById = (productId) => {
    axios
      .delete(`${deleteProduct}/${productId}`)
      .then(() => {
        // Remove the deleted product from the local state
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItem}>
        <TouchableOpacity onPress={toggleAccordion} style={styles.productItemHeader}>
          <Text style={styles.productItemHeaderText}>{item.skuName}</Text>
        </TouchableOpacity>
        {showAccordion && (
          <View style={styles.productItemContent}>
            <Text style={styles.productText}>{item.originalCost}</Text>
            <Text style={styles.productText}>{item.sellingCost}</Text>
            <Text style={styles.productText}>{item.categoryType}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('EditProduct', { productId: item.id })}
              >
                <FontAwesome5 name="edit" size={20} color="#007bff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteProductById(item.id)}
              >
                <FontAwesome5 name="trash-alt" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchALlEnitites();
        setEntity(data);
        console.log("entity", entity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Entity Name</Text>
        <Picker
        style={styles.input}
        selectedValue={entityName}
        onValueChange={(itemValue) => setEntityName(itemValue)}
      >
        <Picker.Item label="Select Entity Name" value="" /> {/* Default "Select a value" option */}

        {Array.isArray(entity)?entity?.map(item => { return <Picker.Item label={item.name} value={item.name} />}):<></>}

      </Picker> 
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Route Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Route Name"
          value={routeName}
          onChangeText={(text) => setRouteName(text)}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <Picker
          style={styles.input}
          selectedValue={username}
          onValueChange={(itemValue) => setUsername(itemValue)}
        >
          {/* Add options for User Name */}
        </Picker>
      </View>
      <TouchableOpacity onPress={toggleAccordion} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity>

      {showAccordion && (
        <View style={styles.productAccordionContainer}>
          <Text style={styles.productAccordionHeader}>Products</Text>
          <FlatList
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderProductItem}
          />
          <View style={styles.newProductContainer}>
            <TextInput
              style={styles.newProductInput}
              placeholder="SKU Name"
              value={newProduct.skuName}
              onChangeText={(text) => setNewProduct({ ...newProduct, skuName: text })}
            />
            <TextInput
              style={styles.newProductInput}
              placeholder="Original Cost"
              value={newProduct.originalCost}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, originalCost: text })
              }
            />
            <TextInput
              style={styles.newProductInput}
              placeholder="Selling Cost"
              value={newProduct.sellingCost}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, sellingCost: text })
              }
            />
            <TextInput
              style={styles.newProductInput}
              placeholder="Category Type"
              value={newProduct.categoryType}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, categoryType: text })
              }
            />
            <TouchableOpacity onPress={addProduct} style={styles.addProductButton}>
              <Text style={styles.addProductButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={toggleAccordion} style={styles.closeAccordionButton}>
            <Text style={styles.closeAccordionButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={saveDetails} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
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
  formGroup: {
    marginBottom: 10,
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
  },
  addButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    color: '#ffffff',
    fontSize: 24,
  },
  productAccordionContainer: {
    marginVertical: 20,
  },
  productItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 10,
  },
  productItemHeader: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  productItemHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productItemContent: {
    padding: 15,
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 12,
  },
  deleteButton: {
    marginLeft: 8,
  },
  newProductContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  newProductInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  addProductButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addProductButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  closeAccordionButton: {
    backgroundColor: '#dc3545',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  closeAccordionButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default CreateProduct;

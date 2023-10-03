import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 for better icons

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('UserList')}
      >
        <FontAwesome5 name="users" size={24} color="#007bff" />
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonMargin]}
        onPress={() => navigation.navigate('EntityList')}
      >
        <FontAwesome5 name="list-ul" size={24} color="#007bff" />
        <Text style={styles.buttonText}>Entity</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.buttonMargin]}
        onPress={() => navigation.navigate('CreateProduct')}
      >
        <FontAwesome5 name="shopping-cart" size={20} color="#007bff" />
        <Text style={styles.buttonText}>Product Template</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4', // Background color
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonMargin: {
    marginTop: 20,
  },
});

export default HomeScreen;

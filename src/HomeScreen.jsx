import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // You can use a different icon library if you prefer

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => navigation.navigate('UserList')}
      >
        <FontAwesome name="user" size={24} color="black" /> {/* Change "home" to "plus" for Create */}
        <Text style={{ marginLeft: 10 }}>UsernameForm</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20,marginLeft:-33 }}
        onPress={() => navigation.navigate('EntityList')}
      >
        <FontAwesome name="plus" size={24} color="black" /> {/* Change "envelope" to "user" for Profile */}
        <Text style={{ marginLeft: 10 }}>EntityList</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

// DetailsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Details Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Entity Page"
        onPress={() => navigation.navigate('EntityList')}
      />
    </View>
  );
}

export default DetailsScreen;

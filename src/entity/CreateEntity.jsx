// // import React from 'react';
// // import { View, Text, Button } from 'react-native';

// // function CreateEntity({ navigation }) {
// //   return (
// //     <View>
// //       <Button
// //         title="Create"
// //         onPress={() => navigation.navigate('Entity/List')}
// //       />
// //     </View>
// //   );
// // }

// // export default CreateEntity;
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// function CreateEntity({ navigation }) {
//   const [name, setName] = useState('');
//   const [gst, setGst] = useState(null);
//   const [account, setAccount] = useState(null);


//   const handleSubmit = () => {
//     // Perform submission logic here
//     // You can access the values of name, gst, and account in this function
//     // Create an entity object with the entered data
//     // backend api call -> fetch of post method
//     // const newEntity = { name, gst, account };

//     // Add the new entity to the entity list data
//     // entityListData.push(newEntity);

//     // Navigate to the Entity/List page and pass the updated entity list data
//     // navigation.navigate('EntityList', { entityListData });
//     // Create an object with the data to be sent to the API
//     navigation.navigate('EntityList');
//   const entityData = {
//     name,
//     gst,
//     accountNumber: account,
//   };
//   console.log("Entity",entityData);

//   // Define the URL of your API
//   const apiUrl = 'http://192.168.43.186:8080/entity/save'; // Replace with your actual API URL

//   // Make a POST request to the API
//   fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       // You may need to include additional headers such as authentication headers
//     },
//     body: JSON.stringify(entityData), // Convert the data to JSON format
//   })
//     .then((response) => {
//       console.log("Response",response);
//       if (!response.ok) {
//         // Handle error responses here
//         throw new Error('Network response was not ok');
//       }
//       return response.json(); // Parse the response data as JSON
//     })
//     .then((responseData) => {
//       // Handle the successful response from the API here
//       console.log('Response from API:', responseData);

//       // You can also perform navigation or other actions here
//       // For example, navigate to a success page
//       navigation.navigate('EntityList');
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the fetch
//       console.error('Error:', error);
//     });
//   };

//   return (
//     <View style={{ padding: 16 }}>
//       <Text style={{ fontSize: 20, marginBottom: 10 }}>Create Entity</Text>
//       <View style={{ marginBottom: 10 }}>
//         <Text>Name:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Name"
//           value={name}
//           onChangeText={(text) => setName(text)}
//         />
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <Text>GST:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter GST"
//           value={gst}
//           onChangeText={(text) => setGst(text)}
//         />
//       </View>
//       <View style={{ marginBottom: 10 }}>
//         <Text>Account:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Account"
//           value={account}
//           onChangeText={(text) => setAccount(text)}
//         />
//       </View>
//       <Button
//         title="Submit"
//         onPress={handleSubmit}
//       />
//       <Button
//          title="View"
//          onPress={handleSubmit}
//          />
//     </View>
    
//   );
// }

// const styles = StyleSheet.create({
//   input: {
//     width: '100%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//   },
// });
// export default CreateEntity;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveEntitty } from '../services/Constants';

function CreateEntity({ navigation }) {
  const [name, setName] = useState('');
  const [gst, setGst] = useState(null);
  const [account, setAccount] = useState(null);

  const handleSubmit = () => {
    // Create an object with the data to be sent to the API
    const entityData = {
      name,
      gst,
      accountNumber: account,
    };

    // Define the URL of your API
    // const apiUrl = 'http:// 192.168.43.186:8080/entity/save'; // Replace with your actual API URL
     console.log("url",entityData,saveEntitty);
    // Make a POST request to the API
    fetch(saveEntitty, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers such as authentication headers
      },
      body: JSON.stringify(entityData), // Convert the data to JSON format
    })
      .then((response) => {
        console.log("Response", response);
        if (!response.ok) {
          // Handle error responses here
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response data as JSON
      })
      .then((responseData) => {
        // Handle the successful response from the API here
        console.log('Response from API:', responseData);

        // Show an alert for successful submission
        Alert.alert('Success', 'Entity has been created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('EntityList');
              // Do nothing or add any additional logic if needed
            },
          },
        ]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Create Entity</Text>
      <View style={{ marginBottom: 10 }}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>GST:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter GST"
          value={gst}
          onChangeText={(text) => setGst(text)}
        />
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Account:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Account"
          value={account}
          onChangeText={(text) => setAccount(text)}
        />
      </View>
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      <Button
          title="Submit"
          onPress= {handleSubmit}
        />
      <Button
        title="View"
        onPress={() => navigation.navigate('EntityList')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default CreateEntity;

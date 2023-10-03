import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, Picker, StyleSheet, TouchableOpacity,Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { user } from '../services/Constants';
import { fetchALlEnitites } from '../services/EntityService';
import { useEffect } from 'react';


const UsernameForm = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [entityName, setEntityName] = useState('');
  const [routeName, setRouteName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const[entity,setEntity]=useState([]);


  const roles = ['Owner', 'Admin', 'Supplier', 'Delivery'];

  const handleRoleChange = (role) => {
    setSelectedRole(role === selectedRole ? '' : role);
  };
  const handleSubmit = () => {
    let roles = [];
    roles.push(selectedRole);
    // Create a data object to hold the form values
    const formData = {
      firstName,
      middleName,
      lastName,
      loginName:login,
      password,
      emailId:email,
      phoneNumber,
      roles,
      entityName,
      routeName,
    }
    fetch(user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You may need to include additional headers such as authentication headers
      },
      body: JSON.stringify(formData), // Convert the data to JSON format
    })
      .then((response) => {
        console.log("Response", formData);
        if (!response.ok) {
          // Handle error responses here
          if (response.status === 409) {
            // HTTP status code 409 indicates a conflict, which might mean the user already exists
            throw new Error('User already exists in the database');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        return response.json(); // Parse the response data as JSON
      })
      .then((responseData) => {
        // Handle the successful response from the API here
        console.log('Response from API:', responseData);

        // Show an alert for successful submission
        Alert.alert('Success', 'Record has been created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('UserList');
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

  // useEffect(async() => {

  //  setEntity(await fetchALlEnitites());
  //  console.log("entity",entity);
   
  // }, []);
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
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder='First Name'
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Middle Name'
        value={middleName}
        onChangeText={(text) => setMiddleName(text)}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Login'
        value={login}
        onChangeText={(text) => setLoginName(text)}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder='Password'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
          <Icon
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color={showPassword ? 'grey' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder='Phone Number'
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Roles</Text>
      <View style={styles.checkboxContainer}>
        {roles.map((role) => (
          <View key={role} style={styles.checkboxItem}>
            <CheckBox
              value={role === selectedRole}
              onValueChange={() => handleRoleChange(role)}
            />
            <Text style={styles.checkboxLabel}>{role}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.label}>Entity Name</Text>
      <Picker
        style={styles.input}
        selectedValue={entityName}
        onValueChange={(itemValue) => setEntityName(itemValue)}
      >
        <Picker.Item label="Select Entity Name" value="" /> {/* Default "Select a value" option */}

        {Array.isArray(entity)?entity?.map(item => { return <Picker.Item label={item.name} value={item.name} />}):<></>}

      </Picker> 

      <Text style={styles.label}>Route Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Route Name'
        value={routeName}
        onChangeText={(text) => setRouteName(text)}
      />
       <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: 'black', // Font color changed to black
    fontWeight: 'bold', // Font weight set to bold
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  iconButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black', // Font color changed to black
  },
  // Additional styles for the submit button
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white', // Font color changed to white
    fontSize: 18,
    fontWeight: 'bold', // Font weight set to bold
  },
});
export default UsernameForm;

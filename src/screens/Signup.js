/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Alert} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        userId: userId,
      })
      .then(res => {
        console.log('user created');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput placeholder="Enter Name"
        style={[styles.input, { marginTop: 50 }]}
        value={name}
        onChangeText={txt => setName(txt)} />
      <TextInput placeholder="Enter Email"
        style={[styles.input, { marginTop: 20 }]}
        value={email}
        onChangeText={txt => setEmail(txt)} />
      <TextInput placeholder="Enter Mobile"
        keyboardType="number-pad"
        style={[styles.input, { marginTop: 20 }]}
        value={mobile}
        onChangeText={txt => setMobile(txt)} />
      <TextInput placeholder="Enter Password"
        style={[styles.input, { marginTop: 20 }]}
        value={password}
        onChangeText={txt => setPassword(txt)} />
      <TextInput placeholder="Enter Confirm Password"
        style={[styles.input, { marginTop: 20 }]}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)} />
      <TouchableOpacity style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btntxt}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.acct}>Allready have an Account?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    felx: 1,
  },
  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginTop: 100,
    fontWeight: '800',
  },
  input: {
    width: '90%',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 7,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 65,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'black',
  },
  btntxt: {
    color: 'white',
    fontSize: 23,
  },
  acct: {
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 18,
    paddingRight: 100,
  },
  login: {
    alignSelf: 'center',
    left: 113,
    fontSize: 23,
    color: 'black',
    textDecorationLine: 'underline',
    bottom: 34,
  },
});

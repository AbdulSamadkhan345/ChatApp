/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const loginUser = () => {
    setVisible(true);
    firestore().collection('users').where('email', '==', email)
      .get().then(res => {
        setVisible(false);
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId);
        } else {
          Alert.alert('User Not Excited');
        }
      }).catch(error => {
        setVisible(false);
        console.log(error);
        Alert.alert('User Not Excited');
      });
  };
  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('MainScreen');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Enter Email"
        style={[styles.input, { marginTop: 150 }]}
        value={email}
        onChangeText={txt => setEmail(txt)} />
      <TextInput placeholder="Enter Password"
        style={[styles.input, { marginTop: 20 }]}
        value={password}
        onChangeText={txt => setPassword(txt)} />
      <TouchableOpacity style={styles.btn}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.btntxt}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.acct}>Don't have an Account?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={styles.login}>Sign Up</Text>
      </TouchableOpacity>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    felx: 1,
  },
  title: {
    fontSize: 40,
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
    left: 110,
    fontSize: 23,
    color: 'black',
    textDecorationLine: 'underline',
    bottom: 34,
  },
});

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation ,useIsFocused} from '@react-navigation/native';
let id = '';
const Users = () => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);
    const [mode, setMode] = useState('LIGHT');
    const isFocued = useIsFocused();
    useEffect(() => {
      getUsers();
    }, []);
    useEffect(() => {
      getMode();
    }, [isFocued]);
    const getMode = async () => {
      setMode(await AsyncStorage.getItem('MODE'));
    };
    const getUsers = async () => {
        id = await AsyncStorage.getItem('USERID');
        let tempData = [];
        const email = await AsyncStorage.getItem('EMAIL');
        firestore()
          .collection('users')
          .where('email', '!=', email)
          .get()
          .then(res => {
            if (res.docs != []) {
              res.docs.map(item => {
                tempData.push(item.data());
              });
            }
            setUsers(tempData);
          });
      };
    return (
        <View style={[
            styles.container,
            {backgroundColor: mode == 'LIGHT' ? 'white' : '#212121'},
          ]}>
            <View style={styles.header}>
                <Text style={styles.headertxt}>Chat App</Text>
            </View>
            <FlatList
                data={users}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.userItem}
                        onPress={()=>{
                            navigation.navigate('Chat',{data:item,id:id});
                        }}>
                            <Image source={require('../images/users.png')} style={styles.usericon} />
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                }} />
        </View>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        height: 70,
        backgroundColor: 'black',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headertxt: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600',
    },
    userItem: {
        width: Dimensions.get('window').width - 50,
        alignSelf: 'center',
        marginTop: 20,
        flexDirection: 'row',
        height: 65,
        borderWidth: 0.7,
        borderRadius: 8,
        paddingLeft: 20,
        alignItems: 'center',
    },
    usericon: {
        width: 43,
        height: 43,
    },
    name:{
        color:'black',
        marginLeft:20,
        fontSize:20,
    },
});

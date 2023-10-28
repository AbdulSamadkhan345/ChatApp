/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
    const navigation = useNavigation();
    const [messageList, setMessageList] = useState([]);
    const route = useRoute();
    useEffect(() => {
        const subscriber = firestore()
            .collection('chats')
            .doc(route.params.id + route.params.data.userId)
            .collection('messages')
            .orderBy('createdAt', 'desc');
        subscriber.onSnapshot(querysnapshot => {
            const allmessages = querysnapshot.docs.map(item => {
                return { ...item._data, createdAt: item._data.createdAt };
            });
            setMessageList(allmessages);
        });
        return () => subscriber();
    }, []);

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0];
        const myMsg = {
            ...msg,
            sendBy: route.params.id,
            sendTo: route.params.data.userId,
            createdAt: Date.parse(msg.createdAt),
        };
        setMessageList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firestore()
            .collection('chats')
            .doc('' + route.params.id + route.params.data.userId)
            .collection('messages')
            .add(myMsg);
        firestore()
            .collection('chats')
            .doc('' + route.params.data.userId + route.params.id)
            .collection('messages')
            .add(myMsg);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image source={require('../images/back.png')}
                        style={styles.back} />
                </TouchableOpacity>
                <Text style={styles.headertxt}>Chat</Text>
            </View>
            <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
        </View>
    );
};

export default Chat;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 65,
        backgroundColor: 'black',
    },
    headertxt: {
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        bottom: 33,
    },
    back: {
        height: 40,
        width: 40,
        left: 20,
        top: 10,
    },
});

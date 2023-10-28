/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const MainScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? (<Users />) : (<Setting />)}
      <View style={styles.bottomtab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image source={require('../images/user.png')}
            style={[styles.tabicon,
            { tintColor: selectedTab == !0 ? 'white' : '#a09f9f' }]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image source={require('../images/setting.png')}
            style={[styles.tabicon,
            { tintColor: selectedTab == !1 ? 'white' : '#a09f9f' }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomtab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabicon: {
    height: 32,
    width: 32,
  },
});

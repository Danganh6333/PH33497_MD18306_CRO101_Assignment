import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const InternetLinks = () => {
    const openGoogle = () => {
      Linking.openURL('https://www.google.com');
    };
    const openFacebook = () => {
      Linking.openURL('https://www.facebook.com');
    };
    const openReddit = () => {
      Linking.openURL('https://www.reddit.com/');
    };
  return (
    <View style={styles.khung}>
      <TouchableOpacity onPress={openGoogle}>
        <Image
        source={require('../../assets/img/search.png')}
        style={styles.icon}  
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={openFacebook}>
        <Image
        source={require('../../assets/img/facebook.png')}
        style={styles.icon}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={openReddit}>
         <Image
        source={require('../../assets/img/reddit.png')}
        style={styles.icon}
      />
      </TouchableOpacity>
     
    </View>
  );
};

export default InternetLinks;

const styles = StyleSheet.create({
  khung: {
    display: 'flex',
    flexDirection: 'row',
    alignContent:'center',
    justifyContent:'center'
  },
  icon: {
    width:45,
    height:45,
    margin:20,
  },
});

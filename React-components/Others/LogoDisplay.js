import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const LogoDisplay = () => {
  return (
    <View style={styles.khung}>
      <Image source={require('../../assets/img/logo.png')} style={styles.anh} />
    </View>
  );
};

const styles = StyleSheet.create({
  khung: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  anh: {
    width: 150,
    height: 150,
    marginTop: 60,
    marginBottom: 10,
  },
});

export default LogoDisplay;

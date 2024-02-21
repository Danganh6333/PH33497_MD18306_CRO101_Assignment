import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';

const Hello = (props) => {
  const {navigation} = props;
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
      <Image style={{width:270,height:270}} source={require('../../assets/img/logo.jpg')}/>
    </View>
  );
};

export default Hello;

const styles = StyleSheet.create({});

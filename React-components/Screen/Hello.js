import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Hello = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    const timeout = setTimeout(() => {
      props.navigation.navigate('SignIn');
    }, 4000);
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
      <Image style={{width:270,height:270}} source={require('../../assets/img/logo.jpg')}/>
    </View>
  );
};

export default Hello;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Link = () => {
  return (
    <View style={styles.container}>
      <View style={styles.dashedLine} />
      <Text style={styles.text}>Hoặc</Text>
      <View style={styles.dashedLine} />
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:20,
    marginBottom:20
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
});

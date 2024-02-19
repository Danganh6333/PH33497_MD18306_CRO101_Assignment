import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const CustomButton3 = ({onPress, title}) => {
  return (
    <View style={{display:'flex',alignItems: 'center',}}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'aqua',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    height: 50,
    width: 143,
    justifyContent: 'center',
    elevation: 3,
    marginStart: 20,
    marginEnd: 20,
    marginTop: 7,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton3;

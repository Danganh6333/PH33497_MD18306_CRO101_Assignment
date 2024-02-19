import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton2 = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F8F8FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    marginStart :20,
    marginEnd:20,
    marginTop:7
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton2;

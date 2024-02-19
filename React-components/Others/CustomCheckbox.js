import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

const CustomCheckbox = ({
  isChecked,
  setIsChecked,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      AsyncStorage.setItem("SavedEmail", email);
      AsyncStorage.setItem("SavedPassword", password);
    } else {
      AsyncStorage.removeItem("SavedEmail");
      AsyncStorage.removeItem("SavedPassword");
    }
  };

  return (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={handleCheckboxToggle}
    >
      <View style={[styles.checkbox, isChecked ? styles.checked : null]} />
      <Text style={styles.label}>Lưu Đăng Nhập</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginStart: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.7,
    borderRadius: 4,
    borderColor: "#000",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#8e44ad",
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckbox;

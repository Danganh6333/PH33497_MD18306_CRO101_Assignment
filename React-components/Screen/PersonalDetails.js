import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton2 from "../Button/CustomButton2";

const PersonalDetails = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("LoginData");
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
        }
      } catch (error) {
        console.error("Error retrieving user information: ", error);
      }
    };
    retrieveUserInfo();
  }, []);
  const updateAccount = () => {
      
  };
  return (
    <View>
      <Text style={styles.header}>Thông Tin Cá Nhân</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và Tên"
        value={username}
        onChangeText={(txt) => {
          setUsername(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Số Điện Thoại"
        value={phoneNumber}
        onChangeText={(txt) => {
          setPhoneNumber(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật Khẩu"
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Mời Nhập Lại Mật Khẩu"
        onChangeText={(txt) => {
          setRePassword(txt);
        }}
      />
      <CustomButton2 onPress={()=>{updateAccount()}} title="Cập Nhật"/>
    </View>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    marginBottom: 45,
    marginTop: 20,
    fontSize: 27,
  },
  input: {
    marginBottom: 19,
    marginEnd: 20,
    marginStart: 20,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    paddingStart: 15,
    shadowRadius: 20,
    opacity: 0.9,
    height: 48,
  },
  btn: {
    width: 20,
    marginHorizontal: 2333333333,
  },
  text:{
    
  }
});

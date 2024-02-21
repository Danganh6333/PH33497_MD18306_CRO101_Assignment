import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton2 from "../Button/CustomButton2";
import { useNavigation } from "@react-navigation/native";

const PersonalDetails = (props) => {
  const Move = useNavigation();
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const retrieveUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("LoginData");
        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          setUserInfo(userInfo);
          setUpdatedUsername(userInfo.username);
          setUpdatedEmail(userInfo.email);
          setUpdatedPhoneNumber(userInfo.phoneNumber);
        }
      } catch (error) {
        console.error("Lỗi: ", error);
      }
    };
    retrieveUserInfo();
  }, []);

  const updateAccount = () => {
    let updatedProduct = {
      username: updatedUsername,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
      password: password,
    };
    if (password !== rePassword) {
      Alert.alert("Mật Khẩu Phải Trùng Nhau");
      return;
    }
  
    if (!userInfo) {
      console.error("Không có thông tin người dùng");
      return;
    }
  
    if (password !== userInfo.password) {
      Alert.alert("Mật Khẩu Sai");
      return;
    }
  
    // Check if the updated information conflicts with existing user info
    const userExists = userInfo.username === updatedUsername ||
      userInfo.email === updatedEmail ||
      userInfo.phoneNumber === updatedPhoneNumber;
  
    if (userExists) {
      Alert.alert(
        "Tên người dùng, email hoặc số điện thoại đã tồn tại trong hệ thống"
      );
      return;
    }
  
    let url_api = `http://192.168.1.103:3000/users/${userInfo.id}`;
    fetch(url_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((result) => {
        if (result.status == 201) {
          Alert.alert("Cập nhật thành công");
          Move.navigate("BottomTabNavigator");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };  
  return (
    <View>
      <Text style={styles.header}>Thông Tin Cá Nhân</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và Tên"
        value={updatedUsername}
        onChangeText={(txt) => {
          setUpdatedUsername(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={updatedEmail}
        onChangeText={(txt) => {
          setUpdatedEmail(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Số Điện Thoại"
        value={updatedPhoneNumber}
        onChangeText={(txt) => {
          setUpdatedPhoneNumber(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật Khẩu"
        secureTextEntry
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Mời Nhập Lại Mật Khẩu"
        secureTextEntry
        onChangeText={(txt) => {
          setRePassword(txt);
        }}
      />
      <CustomButton2 onPress={updateAccount} title="Lưu" />
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
  text: {},
});

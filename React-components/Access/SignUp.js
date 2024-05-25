import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert, Image } from "react-native";
import Logo from "../Others/LogoDisplay.js";
import CustomButton from "../Button/CustomButton1.js";
import isEmail from "validator/lib/isEmail";
import ipv from "../../COMMON.js";

const SignUp = (props) => {
  const { navigation } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const DangKy = async () => {
    let url_api = `http://${ipv}:3000/users`;
    if (rePassword !== password) {
      alert("Hai ô mật khẩu phải trùng nhau");
      return;
    }
    if (!isEmail(email)) {
      alert("Email chưa đúng định dạng");
      return;
    }
    if (username.trim() < 3 && password.trim() <= 5) {
      alert(
        "Tên người dùng phải trên 3 ký tự và mật khẩu phải trên hoặc bằng 5 ký tự"
      );
      return;
    }
    const response = await fetch(url_api);
    const data = await response.json();

    const existingUsername = data.find((user) => user.username === username);
    const existingEmail = data.find((user) => user.email === email);
    const existingPhoneNumber = data.find(
      (user) => user.phoneNumber === phoneNumber
    );
    if (existingUsername) {
      alert("Tên người dùng đã tồn tại");
      return;
    }  
    if (existingEmail) {
      alert("Email đã tồn tại");
      return;
    }
  
    if (existingPhoneNumber) {
      alert("Số điện thoại đã tồn tại");
      return;
    }
    let objSP = {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
    };

    fetch(url_api, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objSP),
    })
      .then((result) => {
        if (result.status == 201) alert("Đăng Ký thành công");
      })
      .catch((ex) => {
        console.log(ex);
      });
  };
  const DangNhap = () => {
    Alert.alert("Bạn Bấm Đăng Nhập");
    navigation.navigate("SignIn");
  };
  return (
    <View>
      <Logo />
      <View>
        <Text style={styles.welcome}>Chào Mừng Tới Ứng Dụng</Text>
        <Text style={styles.title}>Đăng Ký</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập Họ tên"
            placeholderTextColor="#555"
            onChangeText={(txt) => {
              setUsername(txt);
            }}
          />
          <Image
            source={require("../../assets/img/user.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập email"
            placeholderTextColor="#555"
            onChangeText={(txt) => {
              setEmail(txt);
            }}
          />
          <Image
            source={require("../../assets/img/email.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập số điện thoại"
            placeholderTextColor="#555"
            onChangeText={(txt) => {
              setphoneNumber(txt);
            }}
          />
          <Image
            source={require("../../assets/img/tty-answer.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập mật khẩu"
            placeholderTextColor="#555"
            secureTextEntry
            onChangeText={(txt) => {
              setPassword(txt);
            }}
          />
          <Image
            source={require("../../assets/img/userlock.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập lại mật khẩu"
            placeholderTextColor="#555"
            secureTextEntry
            onChangeText={(txt) => {
              setRePassword(txt);
            }}
          />
          <Image
            source={require("../../assets/img/userlock.png")}
            style={styles.icon}
          />
        </View>
        <CustomButton
          title="Đăng Ký"
          style={styles.button}
          onPress={() => DangKy()}
        />
        <Text style={styles.signIn}>
          Bạn đã có tài khoản?
          <Text
            style={{ color: "#8e44ad", fontWeight: "600", fontSize: 16 }}
            onPress={() => DangNhap()}
          >
            &nbsp;Đăng nhập
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  signIn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.8,
    margin: 14,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 15,
    alignContent: "center",
  },
  icon: {
    position: "absolute",
    right: 15,
    height: 20,
    width: 20,
    marginTop: 18,
    resizeMode: "contain",
    marginEnd: 16,
  },
  input: {
    height: 56,
    fontSize: 18,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingStart: 10,
    marginStart: 18,
    marginEnd: 18,
    marginBottom: 5,
    paddingRight: 40,
    borderRadius: 8,
    color: "#333",
  },
  button: {
    backgroundColor: "#8e44ad",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
});

export default SignUp;

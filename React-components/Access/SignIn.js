import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../Others/LogoDisplay.js";
import CustomButton1 from "../Button/CustomButton1.js";
import CustomButton2 from "../Button/CustomButton2.js";
import CustomCheckbox from "../Others/CustomCheckbox.js";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const retrieveLoginInfo = async () => {
      await AsyncStorage.getItem("SavedEmail");
      await AsyncStorage.getItem("SavedPassword");
    };
    retrieveLoginInfo();
  }, []);
  const DangNhap = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Vui lòng nhập email và mật khẩu");
      return;
    }
    try {
      let url_api = "http://192.168.1.103:3000/users?email=" + email;
      const response = await fetch(url_api);
      const res_login = await response.json();
      if (res_login.length !== 1) {
        Alert.alert("Sai email hoặc lỗi trùng lặp dữ liệu");
      } else {
        const objU = res_login[0];
        if (objU.password !== password) {
          Alert.alert("Sai mật khẩu");
        } else {
          await AsyncStorage.setItem("LoginData", JSON.stringify(objU));
          if (isChecked) {
            await AsyncStorage.setItem("LoginInfo", JSON.stringify(objU));
          }
          navigation.navigate("BottomTabNavigator");
          Toast.show({
            type: "success",
            text1: "Xin chào",
            text2: "Chào mừng bạn đã quay trở lại app",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  const QuenMatKhau = () => {};
  const DangKy = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View>
      <Logo />
      <View>
        <Text style={styles.title}>Đăng Nhập</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập email"
            placeholderTextColor="#555"
            onChangeText={(txt) => setEmail(txt)}
            value={email}
          />
          <Image
            source={require("../../assets/img/user.png")}
            style={styles.icon}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mời nhập mật khẩu"
            placeholderTextColor="#555"
            onChangeText={(txt) => setPassword(txt)}
            value={password}
          />
          <Image
            source={require("../../assets/img/userlock.png")}
            style={styles.icon}
          />
        </View>
        <CustomCheckbox
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <CustomButton1
          title="Đăng Nhập"
          style={styles.button}
          onPress={DangNhap}
        />
        <CustomButton2 title="Đăng Ký" style={styles.button} onPress={DangKy} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            opacity: 0.8,
            margin: 14,
          }}
          onPress={QuenMatKhau}
        >
          Quên mật khẩu?
        </Text>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
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

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Setting = (props) => {
  const move = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1, gap: 24, padding: 25 }}>
      <Text style={styles.itemHeader}>Cài Đặt</Text>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Icon name="history" size={26} />
          <Text style={styles.itemText}>Lịch Sử</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <View style={styles.hr} />
      <TouchableOpacity
        onPress={() => {
          move.navigate("PersonalDetails");
        }}
      >
        <View style={styles.itemContainer}>
          <Icon name="account-edit-outline" size={26} />
          <Text style={styles.itemText}>Thông Tin Cá Nhân</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <View style={styles.hr} />
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Icon name="map-marker-outline" size={26} />
          <Text style={styles.itemText}>Địa Chỉ</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <View style={styles.hr} />
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Icon name="credit-card-lock-outline" size={26} />
          <Text style={styles.itemText}>Phương Thức Thanh Toán</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <View style={styles.hr} />
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Icon name="information" size={26} />
          <Text style={styles.itemText}>Về Chúng Tôi</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <View style={styles.hr} />
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Icon name="help-circle-outline" size={26} />
          <Text style={styles.itemText}>Trợ Giúp</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <View style={styles.hr} />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.itemContainer}>
          <Icon name="logout" size={26} />
          <Text style={styles.itemText}>Đăng Xuất</Text>
          <Icon name="chevron-right" size={26} />
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon name="alert" size={45} marginBottom={20} />
            <Text style={styles.modalText}>Liệu Bạn Có Muốn Đăng Xuất ?</Text>
            <View style={styles.buttonDisplay}>
              <Pressable
                onPress={() => {
                  move.navigate("SignIn");
                }}
                style={styles.btnYes}
              >
                <Text style={styles.textStyle}>Có</Text>
              </Pressable>
              <Pressable
                style={styles.btnNo}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Không</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between",
  },
  itemHeader: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 12,
  },
  itemText: {
    fontSize: 20,
    width: 231,
    marginEnd: 75,
    marginStart: 22,
  },
  hr: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.3,
    marginVertical: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "0%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 23,
  },
  buttonDisplay: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  btnYes: {
    borderWidth: 1,
    backgroundColor: "#008CBA",
    color: "white",
    width: 100,
    height: 34,
    paddingTop: 5,
    paddingBottom: 2,
    fontWeight: 20,
    borderRadius: 10,
    elevation: 12,
  },
  btnNo: {
    backgroundColor: "#FAF9F6",
    borderWidth: 1,
    width: 100,
    height: 35,
    paddingTop: 5,
    fontWeight: 20,
    borderRadius: 10,
    elevation: 12,
  },
  textStyle: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});

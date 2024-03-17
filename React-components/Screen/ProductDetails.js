import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const Move = useNavigation();
  const url_api = "http://10.24.26.236:3000/carts";

  const AddItem = async () => {
    const isItemInCart = cartItems.some(
      (cartItem) => cartItem.idProduct === item.id
    );
    if (isItemInCart) {
      alert("Sản Phẩm đã tồn tại trong giỏ hàng");
      return;
    }
    setCartItems([...cartItems, item]);
    const objSP = {
      idProduct: item.id,
      quantity: 1,
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
        if (result.status == 201) alert("Thêm vào giỏ hàng thành công");
      })
      .catch((ex) => {
        console.log(ex);
      });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: item.image }}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => Move.navigate("BottomTabNavigator")}
        >
          <Icon name="arrow-left" size={25} color="black" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.content}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>
          Giá{"\n"}
          {item.price} VND
        </Text>
        <TouchableOpacity style={[styles.footerButton, styles.buyNowButton]} onPress={AddItem}>
          <Text style={styles.buyNowText} >
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  priceContainer: {
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopColor: "black",
  },
  footerButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25a996",
    width: "30%",
    height: "100%",
  },
  buyNowButton: {
    backgroundColor: "#ee4d30",
    width: "60%",
  },
  buyNowText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductDetails;

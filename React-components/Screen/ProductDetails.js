import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/AntDesign";
import Icon2 from "@expo/vector-icons/FontAwesome5";
import Icon3 from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const { item } = route.params;
  const [name, setName] = useState(item.name.toString());
  const [price, setPrice] = useState(item.price.toString());
  const [image, setImage] = useState(item.image.toString());
  const [description, setDescription] = useState(item.description.toString());
  const [liked, setLike] = useState(item.liked);
  const Move = useNavigation();

  return (
    <View style={styles.container}>
       <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.image}
      >
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "center",
              backgroundColor: "white",
              borderRadius: 17,
              opacity: 0.8,
              margin: 15,
            }}
            onPress={() => Move.navigate("BottomTabNavigator")}
          >
            <Icon
              name="arrowleft"
              size={25}
              style={{
                width: 34,
                height: 34,
                textAlignVertical: "center",
                textAlign: "center",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              right: 0,
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              margin: 15,
              gap: 12,
            }}
          >
            <Pressable
              style={{
                alignSelf: "center",
                backgroundColor: "white",
                borderRadius: 17,
                opacity: 0.8,
              }}
            >
              <Icon
                name="sharealt"
                size={25}
                style={{
                  width: 34,
                  height: 34,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              />
            </Pressable>
            <Pressable
              style={{
                alignSelf: "center",
                backgroundColor: "white",
                borderRadius: 17,
                opacity: 0.8,
              }}
            >
              <Icon
                name="shoppingcart"
                size={25}
                style={{
                  width: 34,
                  height: 34,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              />
            </Pressable>
            <Pressable
              style={{
                alignSelf: "center",
                backgroundColor: "white",
                borderRadius: 17,
                opacity: 0.8,
              }}
            >
              <Icon3
                name="more-horizontal"
                size={25}
                style={{
                  width: 34,
                  height: 34,
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      <Image
        style={styles.banner}
        source={require("../../assets/img/apple.jpg")}
      ></Image>
      <View style={styles.content}>
        <View>
          <View style={{ display: "flex", flexDirection: "" }}>
            <Text style={{ padding: 6 }}>
              <Text
                style={{
                  backgroundColor: "#dc4e3e",
                  color: "white",
                  padding: 2,
                }}
              >
                {" "}
                Yêu thích+{" "}
              </Text>
              <Text style={{ fontSize: 17, color: "black" }}>{name}</Text>
            </Text>
          </View>
          <Text style={{ color: "red", fontWeight: "700", fontSize: 20 }}>
            đ155.000
          </Text>
          <Text style={{ textDecorationLine: "line-through", fontSize: 12 }}>
            đ220.000
          </Text>
        </View>
        <View
          style={{
            elevation: 3,
            borderWidth: 1,
            padding: 15,
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 2,
            marginRight: 2,
            display: "flex",
            marginStart: 5,
            marginEnd: 5,
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "black", fontSize: 14 }}>Voucher của Shop</Text>
          <View></View>
          <Text style={{ backgroundColor: "#eda531", marginStart: 120 }}>
            Giảm 10%
          </Text>
          <Text style={{ backgroundColor: "#eda531", marginStart: 10 }}>
            Giảm 15%
          </Text>
        </View>
        <View
          style={{
            elevation: 3,
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            padding: 15,
            marginStart: 5,
            marginEnd: 5,
            marginBottom: 0,
          }}
        >
          <Text style={{ color: "black", fontSize: 14 }}>Giá bán buôn/sỉ</Text>
          <Text style={{ opacity: 0.8, marginStart: 12, fontSize: 14 }}>
            Giá còn đ129.000 khi mua ≥ 2 sản phẩm
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={{
            width: "20%",
            backgroundColor: "#25a996",
            borderRightWidth: 0.3,
            borderColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name="wechat" size={21}></Icon>
        </Pressable>
        <Pressable
          style={{
            width: "20%",
            backgroundColor: "#25a996",
            borderRightWidth: 0.3,
            borderColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon2 name="cart-plus" size={21}></Icon2>
        </Pressable>
        <Pressable
          style={{
            width: "60%",
            backgroundColor: "#ee4d30",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "700", color: "white" }}
          >
            Mua ngay
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 5,
    position: "relative",
  },
  banner: {
    flex: 1,
    height: "auto",
    width: "100%",
    resizeMode: "cover",
  },
  content: {
    flex: 3,
  },
  footer: {
    height: 57,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 0.3,
    textAlignVertical: "center",
  },
});

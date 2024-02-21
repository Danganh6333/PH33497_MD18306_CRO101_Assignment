import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const SearchBox = ({ data, input }) => {
  const navigation = useNavigation();
  console.log("Heeeey",data);
  const toggleLiked = (itemId) => {
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId],
    }));
    let updatedProduct = {
      ...data.find((item) => item.id === itemId),
      liked: !likedItems[itemId],
    };
    console.log(updatedProduct);
    let url_api = `http://192.168.1.103:3000/products/${itemId}`;
    fetch(url_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (response.status == 201) {
          console.log("Cập nhật thành công");
          if (updatedProduct.liked) {
            setLikedItemsList((prevLikedItemsList) => [
              ...prevLikedItemsList,
              updatedProduct,
            ]);
          } else {
            setLikedItemsList((prevLikedItemsList) =>
              prevLikedItemsList.filter(
                (item) => item.id !== updatedProduct.id
              )
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error updating liked status:", error);
      });
  };

  return (
    <View style={{ marginTop: 10, position: "relative" }}>
      <FlatList
        contentContainerStyle={{
          display: "flex",
          alignItems: "center",
        }}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={data.filter(item => likedItems[item.id])}
        renderItem={({ item }) => {
          if (input === "" || item.name.includes(input)) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetails", { item: item });
                }}
              >
                <View style={{ marginVertical: 12, marginHorizontal: 20 }}>
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 160,
                        height: 130,
                        resizeMode: "cover",
                        borderRadius: 5,
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        zIndex: 1,
                      }}
                      onPress={() => toggleLiked(item.id)}
                    >
                      <Icon
                        name={likedItems[item.id] ? "heart" : "hearto"}
                        size={24}
                        color={likedItems[item.id] ? "red" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 17,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      textDecorationLine: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    {item.price}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        }}
      />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({});
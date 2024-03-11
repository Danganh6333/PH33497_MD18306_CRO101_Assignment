import React, { useEffect, useState } from "react";
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
import Toast from "react-native-toast-message";

const SearchBox = ({ data, input }) => {
  const navigation = useNavigation();
  const [likedItems, setLikedItems] = useState(false);
  useEffect(() => {
    const initialLikedItems = {};
    data.forEach((item) => {
      initialLikedItems[item.id] = item.liked;
    });
    setLikedItems(initialLikedItems);
  }, [data]);
  const toggleLiked = (itemId) => {
    const item = data.find((item) => item.id === itemId);
    if (!item) {
      console.log("Item not found");
      return;
    }
    setLikedItems((prevLikedItems) => ({
      ...prevLikedItems,
      [itemId]: !prevLikedItems[itemId],
    }));

    const updatedProduct = { ...item, liked: !likedItems[itemId] };

    let url_api = `http://10.24.30.213:3000/products/${itemId}`;
    fetch(url_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          Toast.show({
            type: "info",
            text1: "Thông báo",
            text2: "Cập nhật thành công",
          });
          fetch("http://10.24.30.213:3000/products")
            .then((rep) => rep.json())
            .then((data) => {
              setData(data);
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Failed to update");
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
          height: 2000
        }}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={data.filter((item) => likedItems[item.id])}
        renderItem={({ item }) => {
          if (input === "" || item.name.includes(input)) {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProductDetails", { item: item });
                }}
                toggleLiked={(itemId) => toggleLiked(itemId)}
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

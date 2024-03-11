import React, { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const TopNavigation = (props) => {
  const Categories = ["Trái Cây", "Rau Củ", "Thịt"];
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [FruitList, setFruitList] = useState([]);
  const [likedItems, setLikedItems] = useState(false);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState(FruitList);
  const getListFruit = async () => {
    let url_api = "http://10.24.30.213:3000/products";
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setFruitList(json);
    } catch (err) {
      console.log(err);
    } finally {
      setisLoading(false);
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListFruit();
    });
    return unsubscribe;
  }, [navigation]);
  const filterItemsByCategory = (category) => {
    const filteredItems = FruitList.filter(
      (item) => item.categories === category
    );
    setFilteredData(filteredItems);
  };
  useEffect(() => {
    const initialLikedItems = {};
    FruitList.forEach((item) => {
      initialLikedItems[item.id] = item.liked;
    });
    setLikedItems(initialLikedItems);
  }, [FruitList]);

  const toggleLiked = (itemId) => {
    const item = FruitList.find((item) => item.id === itemId);

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
        if (response.ok) {
          Toast.show({
            type: "info",
            text1: "Thông báo",
            text2: "Cập nhật thành công",
          });
          fetch("http://10.24.30.213:3000/products")
            .then((rep) => rep.json())
            .then((data) => {
              setFruitList(data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.error("Lỗi cập nhật thích :", error);
      });
  };

  useEffect(() => {
    filterItemsByCategory(Categories[categoryIndex]);
  }, [categoryIndex]);

  return (
    <View>
      <FlatList
        data={Categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12,
        }}
        style={{ marginBottom: 12 }}
        renderItem={({ item, index }) => {
          const isSelected = categoryIndex === index;
          return (
            <TouchableOpacity
              onPress={() => setCategoryIndex(index)}
              style={{
                backgroundColor: isSelected ? "green" : "white",
                paddingHorizontal: 15,
                paddingVertical: 16,
                borderRadius: 23,
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  width: 100,
                  textAlign: "center",
                  opacity: isSelected ? 1 : 0.3,
                  color: isSelected ? "white" : "black",
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
            minHeight: 2000,
          }}
          data={filteredData}
          navigation={navigation}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item }) => (
            <ShoppingItem
              item={item}
              liked={likedItems[item.id]}
              toggleLiked={(itemId) => toggleLiked(itemId)}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};
const ShoppingItem = ({ item, liked, toggleLiked }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ marginVertical: 12, marginHorizontal: 20 }}
      onPress={() => {
        navigation.navigate("ProductDetails", { item: item });
      }}
    >
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
            name={liked ? "heart" : "hearto"}
            size={24}
            color={liked ? "red" : "black"}
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
    </TouchableOpacity>
  );
};

export default TopNavigation;

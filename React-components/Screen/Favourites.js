import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBox from "../Others/SearchBox";
import { useNavigation } from "@react-navigation/native";


const Favourites = () => {
  const [input, setInput] = useState("");
  const [fruitList, setFruitList] = useState([]);
  const [likedItems, setLikedItems] = useState({});
  
  useEffect(() => {
    const getListFruit = async () => {
      let url_api = "http://192.168.1.103:3000/products";
      try {
        const response = await fetch(url_api);
        const json = await response.json();
        setFruitList(json);
      } catch (err) {
        console.log(err);
      }
    };
    getListFruit();
  }, []);

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Tìm Kiếm"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchBar}
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <SearchBox
        data={fruitList}
        input={input}
        likedItems={likedItems}
        setLikedItems={setLikedItems}
      />
    </SafeAreaView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    margin: 12,
  },
});

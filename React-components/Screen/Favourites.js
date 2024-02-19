import { SafeAreaView, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import SearchBox from "../Others/SearchBox";
import { useNavigation } from "@react-navigation/native";

const Favourites = (props) => {
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  const [FruitList, setFruitList] = useState([]);
  const getListFruit = async () => {
    let url_api = "http://192.168.1.2:3000/products";
    try {
      const response = await fetch(url_api);
      const json = await response.json();
      setFruitList(json);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListFruit();
    });
    return unsubscribe;
  }, [navigation]);
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
      <SearchBox data={FruitList} input={input} setInput={setInput} />
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

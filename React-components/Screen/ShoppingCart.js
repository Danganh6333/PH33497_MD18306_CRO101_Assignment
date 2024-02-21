import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchProductDetail = async (productId) => {
    const url = `http://192.168.1.103:3000/products/${productId}`;
    try {
      const response = await fetch(url);
      const productDetail = await response.json();
      return productDetail;
    } catch (error) {
      console.error("Error fetching product details: ", error);
      return null;
    }
  };
  const fetchCartItems = async () => {
    try {
      const response = await fetch("http://192.168.1.103:3000/carts");
      const data = await response.json();
      setCartItems(data);
      fetchProductDetails();
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const fetchProductDetails = async () => {
    const productIds = cartItems.map((item) => item.idProduct);
    let productDetailsArray = [];
    for (const productId of productIds) {
      const productDetail = await fetchProductDetail(productId);
      productDetailsArray.push(productDetail);
    }
    setProductDetails(productDetailsArray);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const product = productDetails.find((p) => p.id === item.idProduct);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    return total;
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => {
    const product = productDetails.find((p) => p.id === item.idProduct);

    if (!product) {
      return (
        <View style={styles.itemContainer}>
          <Text>Loading....</Text>
        </View>
      );
    }
    return (
      <View style={styles.itemContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text>{product.name}</Text>
          <Text>${product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Icon name="minus" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Icon name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeItem(item.id)}>
          <Icon name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: quantity > 0 ? quantity : 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <View style={styles.summary}>
        <Text>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCartItems([])}
        >
          <Text style={styles.buttonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    marginHorizontal: 10,
  },
  summary: {
    borderTopWidth: 1,
    paddingTop: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

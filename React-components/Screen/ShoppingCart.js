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
import ipv from "../../COMMON";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, [cartItems]);

  const fetchProductDetail = async (productId) => {
    const url = `http://${ipv}:3000/products/${productId}`;
    try {
      const response = await fetch(url);
      const productDetail = await response.json();
      return productDetail;
    } catch (error) {
      console.error("Lỗi lấy chi tiết sản phẩm ", error);
      return null;
    }
  };
  const fetchCartItems = async () => {
    try {
      const response = await fetch(`http://${ipv}:3000/carts`);
      const data = await response.json();
      setCartItems(data);
      fetchProductDetails();
    } catch (error) {
      console.error("Lỗi lấy sản phẩm trong giỏ hàng", error);
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
    let url_api_del = `http://${ipv}:3000/carts/` + id;
    fetch(url_api_del, {
      method: "DELETE",
    })
      .then((result) => {
        if (result.status == 200) {
          alert("Xóa thành công");
  
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
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
          <Text>{product.price} VND</Text>
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

  const updateQuantity = (id, newQuantity) => {
    const quantity = newQuantity > 0 ? newQuantity : 1;
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    const itemToUpdate = cartItems.find((item) => item.id === id);
    if (!itemToUpdate) {
      console.error("Item not found in cart");
      return;
    }
    const url_api = `http://${ipv}:3000/carts/${id}`;
    fetch(url_api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        idProduct: itemToUpdate.idProduct,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Quantity updated successfully");
        } else {
          throw new Error("Failed to update quantity");
        }
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
        fetchCartItems();
      });
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
        <Text>Total: {calculateTotal()} VND</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCartItems([])}
        >
          <Text style={styles.buttonText}>Xóa Trắng</Text>
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

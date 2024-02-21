import { Image, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-native-paper";
import Icon from "@expo/vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Toast from "react-native-toast-message";

import Hello from "./React-components/Screen/Hello";
import SignIn from "./React-components/Access/SignIn";
import SignUp from "./React-components/Access/SignUp";
import HomePage from "./React-components/Screen/HomePage";
import ProductDetails from "./React-components/Screen/ProductDetails";
import ShoppingCart from "./React-components/Screen/ShoppingCart";
import Favourites from "./React-components/Screen/Favourites";
import Contact from "./React-components/Screen/Contact";
import Setting from "./React-components/Screen/Setting";
import PersonalDetails from "./React-components/Screen/PersonalDetails";

import { TouchableOpacity } from "react-native";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Provider>
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "HomePage") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Favourites") {
              iconName = focused ? "heart" : "heart-outline";
            } else if (route.name === "Contact") {
              iconName = focused
                ? "chatbubble-ellipses"
                : "chatbubble-ellipses-outline";
            } else if (route.name === "Setting") {
              iconName = focused ? "cog" : "cog-outline";
            }
            return <Icon name={iconName} size={26} color={"purple"} />;
          },
        })}
      >
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{ tabBarLabel: "Trang Chủ" }}
        />
        <Tab.Screen
          name="Favourites"
          component={Favourites}
          options={{ tabBarLabel: "Yêu Thích" }}
        />
        <Tab.Screen
          name="Contact"
          component={Contact}
          options={{ tabBarLabel: "Liên Hệ" }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{ tabBarLabel: "Cài Đặt" }}
        />
      </Tab.Navigator>
    </Provider>
  );
};
const StackNavigator = () => {
  const Move = useNavigation();
  const renderHeaderLeft = () => (
    <TouchableOpacity>
      <Image
        style={{ width: 32, height: 32 }}
        source={require("./assets/img/logo.png")}
      />
    </TouchableOpacity>
  );
  const renderHeaderRight = () => (
    <TouchableOpacity onPress={() => Move.navigate("ShoppingCart")}>
      <Icon name="cart-outline" size={32}></Icon>
    </TouchableOpacity>
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Hello"
        component={Hello}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
        style={{ position: "absolute" }}
        options={{
          headerLeft: () => renderHeaderLeft(),
          headerRight: () => renderHeaderRight(),
          title: null,
        }}
      />
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={ShoppingCart}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Favourite"
        component={Favourites}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PersonalDetails"
        component={PersonalDetails}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

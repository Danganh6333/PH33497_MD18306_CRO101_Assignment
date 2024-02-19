import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider } from "react-native-paper";

import HomePage from "../Screen/HomePage";
import Favourites from "../Screen/Favourites";
import Contact from "../Screen/Contact";

const MainContainer = () => {
  const TrangChu = "Home";
  const YeuThich = "Favourites";
  const LienHe = "Contact";
  const Tab = createMaterialBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider >
        <Tab.Navigator 

          initialRouteName={TrangChu}
          screenOptions={({ route }) => ({
            tabBarLabelStyle: { fontSize: 14, paddingBottom: 3 },
            tabBarIconStyle: { marginTop: 5 },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              if (rn === TrangChu) {
                iconName = focused ? "home" : "home-outline";
              } else if (rn === YeuThich) {
                iconName = focused ? "heart" : "heart-outline";
              } else if (rn === LienHe) {
                iconName = focused
                  ? "chatbubble-ellipses"
                  : "chatbubble-ellipses-outline";
              }
              return <Icon name={iconName} size={26} color={"purple"} />;
            },
          })}
        >
          <Tab.Screen
            name={TrangChu}
            component={HomePage}
            options={{ headerShown: true, title: "Home" }}
          />
          <Tab.Screen
            name={YeuThich}
            component={Favourites}
            options={{ headerShown: true, title: "Favourites" }}
          />
          <Tab.Screen
            name={LienHe}
            component={Contact}
            options={{ headerShown: true, title: "Contact" }}
          />
        </Tab.Navigator>
      </Provider>
    </SafeAreaView>
  );
};

export default MainContainer;

const styles = StyleSheet.create({});

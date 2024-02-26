import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/Home/Home";
import Discover from "../screen/Discover/Discover";
import { MaterialIcons, FontAwesome, Fontisto } from "@expo/vector-icons";
import LikeScreen from "../screen/Like/Like";

const Tab = createBottomTabNavigator();

const ButtomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        title: "LiveNews",
        headerStyle:{
          backgroundColor:"#566093"
        },
        headerTintColor:"#fff",
        tabBarShowLabel:false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
              <MaterialIcons name="online-prediction" size={22} color={"#fff"} />
          ),
          tabBarActiveBackgroundColor:"#3f445d",
          tabBarInactiveBackgroundColor:"#566093",
        }}

      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: () => (
              <FontAwesome name="cc-discover" size={22} color={"#fff"} />
          ),
          tabBarActiveBackgroundColor:"#3f445d",
          tabBarInactiveBackgroundColor:"#566093"
        }}
      />
      <Tab.Screen
      name="Like"
      component={LikeScreen}
      options={{ 
        tabBarIcon:() => (
          <Fontisto name="like" size={22} color={"#fff"} />
        ),
        tabBarActiveBackgroundColor:"#3f445d",
        tabBarInactiveBackgroundColor:"#566093"
       }}
      />
    </Tab.Navigator>
  );
};

export default ButtomTab;

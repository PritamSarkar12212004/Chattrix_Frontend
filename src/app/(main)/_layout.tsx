import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Socket from "@/src/utils/socket/Socket";
import Storage from "@/src/utils/mmkv/Storage";
import Token from "@/src/constant/token/Token";
import useTextRicever from "@/src/hooks/chat/text/useTextRicever";

const _layout = () => {
  const { reciveText } = useTextRicever()
  useEffect(() => {
    Socket.connect();
    Socket.emit("register", {
      userId: JSON.parse(Storage.getString(Token.userMainData))._id,
    });
    Socket.on("receive-message", (data) => {
      reciveText(data)
    })
    return () => {
      Socket.disconnect();
    };
  }, []);
  return <MainLayout />;
};

const MainLayout = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                className="flex-row items-center justify-center  gap-2"
                style={{
                  width: 150,
                  height: 55,
                  borderRadius: 25,
                  backgroundColor: focused ? "#766BFF" : "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={30}
                  color={focused ? "white" : "gray"}
                />
                <Text
                  className="text-white font-bold text-lg"
                  style={{ color: focused ? "white" : "gray" }}
                >
                  Chats
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="Group"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View
                className="flex-row items-center justify-center  gap-2"
                style={{
                  width: 150,
                  height: 55,
                  borderRadius: 25,
                  backgroundColor: focused ? "#766BFF" : "white",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="chatbubbles-outline"
                  size={30}
                  color={focused ? "white" : "gray"}
                />
                <Text
                  className="text-white font-bold text-lg"
                  style={{ color: focused ? "white" : "gray" }}
                >
                  Groups
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    paddingBottom: 20,
    paddingTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    bottom: 0,
  },
});

export default _layout;

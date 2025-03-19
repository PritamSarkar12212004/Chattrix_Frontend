import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import Storage from "../utils/mmkv/Storage";
import Token from "../constant/token/Token";

const index = () => {
  const router = useRouter();
  const authVarifyer = () => {
    const auth = Storage.getString(Token.userMainData);
    if (auth) router.replace("/(main)");
    else router.replace("/(auth)");
  };
  useEffect(() => {
    setTimeout(() => {
      authVarifyer();
    }, 500);
  }, []);
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

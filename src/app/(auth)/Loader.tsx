import { useAuth, useUser } from "@clerk/clerk-expo";
import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import SafeWraper from "@/src/wraper/SafeWraper";
import AxiosInstance from "@/src/utils/axios/AxiosInstance";

const Loader = () => {
  const { user } = useUser();
  const apiLogin = () => {
    AxiosInstance.post("/login/user-api", {
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName,
      image: user.imageUrl,
    });
  };
  useEffect(() => {
    apiLogin();
  }, []);
  return (
    <SafeWraper>
      <View className="w-full h-full flex items-center justify-center bg-white">
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    </SafeWraper>
  );
};

export default Loader;

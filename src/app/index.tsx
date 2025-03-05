import { useAuth } from "@clerk/clerk-expo";
import React, { useEffect } from "react";
import SafeWraper from "../wraper/SafeWraper";
import { Image, Text, View } from "react-native";
import Logo from "../constant/logo/Logo";
import { useRouter } from "expo-router";

const Index = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const authCheker = () => {
    if (!isSignedIn) router.replace("/(auth)");
    router.replace("/(auth)/Loader");
  };
  useEffect(() => {
    console.log(isSignedIn);
    setTimeout(() => {
      authCheker();
    }, 500);
  }, []);

  return (
    <SafeWraper>
      <View className="w-full h-full bg-black flex items-center justify-center gap-5">
        <Image
          source={Logo.MainLogo}
          className="w-44 h-24"
          resizeMode="cover"
        />
        <Text className="text-blue-500 text-2xl font-bold tracking-widest ">
          CHATTRIX
        </Text>
      </View>
    </SafeWraper>
  );
};

export default Index;

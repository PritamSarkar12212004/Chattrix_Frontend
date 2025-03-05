import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import SafeWraper from "@/src/wraper/SafeWraper";
import useApiSignin from "@/src/hook/auth/useApiSignin";
import { useUser } from "@clerk/clerk-expo";

const Loader = () => {
  const { user } = useUser();

  const { apiBackendLogin } = useApiSignin();
  useEffect(() => {
    user && apiBackendLogin()

  }, [user]);
  return (
    <SafeWraper>
      <View className="w-full h-full flex items-center justify-center bg-white">
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    </SafeWraper>
  );
};

export default Loader;

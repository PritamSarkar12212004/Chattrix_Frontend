import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import AuthPageNavigation from "@/src/components/auth/navigation/AuthPageNavigation";
import { userContext } from "@/src/utils/context/ContextApi";
import useUserRegisterHook from "@/src/hooks/auth/userRegisterHook/useUserRegisterHook";

const Verification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setloading] = useState(false);
  const { tempOtp, tempPhoneNumber } = userContext();

  // useHook
  const { registerUser } = useUserRegisterHook();

  // validation
  const OtpValidation = () => {
    if (tempOtp == otp) {
      setloading(!loading);
      registerUser(tempPhoneNumber, setloading);
    } else {
      Alert.alert("Invalid OTP");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-4 pb-5 pt-5">
        <AuthPageNavigation />
        <View className="flex-1 pt-5 relative">
          {/* Header */}
          <Text className="text-5xl font-extrabold leading-tight">
            <Text className="text-[#7d73e6cc]">V</Text>erify your Account
          </Text>
          <Text className="mt-2 font-semibold">
            Enter OTP to verify your account
          </Text>

          {/* OTP Input */}
          <View className="w-full mt-6 relative">
            <View className="absolute top-9 left-3"></View>
            <OtpInput
              numberOfDigits={6}
              focusColor="#7c73e6"
              autoFocus
              hideStick
              blurOnFilled
              type="numeric"
              onTextChange={setOtp}
              theme={styles.otpTheme}
            />
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            onPress={() => (loading ? null : OtpValidation())}
            className="w-full h-16 bg-[#7c73e6] flex items-center justify-center rounded-2xl mt-10 absolute bottom-0 left-0 right-0"
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-lg">Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  otpTheme: {
    containerStyle: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
    },
    pinCodeContainerStyle: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      paddingVertical: 10,
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F7F9FC",
    },
    pinCodeTextStyle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#333",
    },
    focusStickStyle: {
      backgroundColor: "#7c73e6",
      height: 2,
      width: "100%",
    },
    focusedPinCodeContainerStyle: {
      borderColor: "#7c73e6",
      borderWidth: 2,
    },
    filledPinCodeContainerStyle: {
      borderColor: "#34D399",
    },
    disabledPinCodeContainerStyle: {
      borderColor: "#ccc",
      backgroundColor: "#E5E7EB",
    },
    placeholderTextStyle: {
      color: "#A1A1AA",
    },
  },
});

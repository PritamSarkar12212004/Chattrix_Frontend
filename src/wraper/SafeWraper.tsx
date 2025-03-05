import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const SafeWraper = ({ children }: any) => {
  const statusBarBackground = useSelector((state: any) => state.statusBarBackground);
  const statusBarContent = useSelector((state: any) => state.statusBarContent);
  useEffect(() => { }, [statusBarBackground]);
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={statusBarBackground}
        barStyle={statusBarContent}
      />
      <SafeAreaView>{children}</SafeAreaView>
    </>
  );
};

export default SafeWraper;

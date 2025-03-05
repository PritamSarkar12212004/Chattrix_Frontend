import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import SafeWraper from "@/src/wraper/SafeWraper";
import MainHeader from "@/src/components/main/header/MainHeader";
import { useSelector } from "react-redux";
import ChatLits from "@/src/components/main/chats/chatList/ChatLits";

const index = () => {
  const userChates = useSelector((state: any) => state.chatList);

  useEffect(() => {}, [userChates]);
  return (
    <SafeWraper>
      <View className="w-full h-full flex bg-[#181C14] ">
        <MainHeader />
        <View className="flex w-full flex-1 ">
          <FlatList
            data={userChates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => <ChatLits item={item} />}
          />
        </View>
      </View>
    </SafeWraper>
  );
};

export default index;

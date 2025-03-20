import { View, Text, StatusBar, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/src/components/main/header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/src/components/main/search/SearchBar";
import ChatLister from "@/src/components/main/chatlister/ChatLister";
import RecentChatGet from "@/src/hooks/functions/recentChat/RecentChatGet";

const index = () => {

  // load recent chats
  const [recentChats, setRecentChats] = useState([]);
  const loadChats = () => {
    const chats = RecentChatGet();
    setRecentChats(chats);
  };

  useEffect(() => {
    loadChats()
  }, [])


  return (
    <SafeAreaView className="w-full h-full bg-[#C5D3FF] ">
      <View className="h-full w-full bg-[#C5D3FF] px-3">
        <Header />
        <View className="">
          <SearchBar />
          <View className="w-full flex">
            <FlatList data={recentChats} renderItem={({ item }) => (
              <ChatLister item={item} />
            )} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;

import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatpageNavigation from "@/src/components/main/navigation/ChatpageNavigation";
import ShowChat from "@/src/components/main/chatlister/ShowChat";
import ChatPlaceHolder from "@/src/components/main/chatPlaceHolder/ChatPlaceHolder";
import { userContext } from "@/src/utils/context/ContextApi";
import useSingleUserDataFetch from "@/src/hooks/chat/dataFetch/useSingleUserDataFetch";
import useRicivePushmeg from "@/src/hooks/chat/text/useRicivePushmeg";

const ChatPage = () => {
  const { chatListTemp, setChatListTemp } = userContext()
  // call hook
  const { dataFetch } = useSingleUserDataFetch();
  const { recivePushmeg } = useRicivePushmeg()

  const [userData, setUserData] = useState(null);

  // allTextMessageData
  const [allTextMessage, setAllTextMessage] = useState([]);
  const SynceData = async () => {
    if (typeof chatListTemp === "object") {
      setUserData(chatListTemp);
      loadAllTextMessagData(chatListTemp.id); // userData.id ka wait nahi karna
    } else {
      const number = await chatListTemp.phoneNumbers[0].number;
      dataFetch(number, setUserData);
    }
  };


  const loadAllTextMessagData = (id: any) => {
    console.log(id);
    recivePushmeg(id, setAllTextMessage);
  }
  useEffect(() => {
    SynceData();
    return () => {
      setUserData(null);
      setChatListTemp(null);
    };
  }, []);


  useEffect(() => {
    if (userData) {
      loadAllTextMessagData(userData._id);
    }
  }, [userData]);
  useEffect(() => {
    console.log(allTextMessage);
  }, [allTextMessage]);
  return (
    <SafeAreaView className="bg-[#2CB1A9]">
      <View className="w-full  h-full relative">
        <ChatpageNavigation userData={userData} />
        <ScrollView className="w-full  bg-[#2CB1A9]">
          <View className="w-full flex-1">
            <ShowChat />
          </View>
        </ScrollView>
        <View className="w-full absolute bottom-0  ">
          <ChatPlaceHolder userData={userData} setAllTextMessage={setAllTextMessage} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;

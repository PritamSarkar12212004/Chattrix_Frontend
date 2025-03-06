import { View, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavigateInfo } from "@/src/utils/redux/slice/page/NavigateInfo";
import ChatsWraper from "@/src/wraper/ChatsWraper";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatHeader from "@/src/components/main/header/ChatHeader";
import usemessageSender from "../../hook/chats/usemessageSender";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { sendMessage } = usemessageSender();
  const navigateInfo = useSelector(
    (state: any) => state.NavigateInfo.navigateInfo
  );

  useEffect(() => {
    return () => {
      dispatch(setNavigateInfo(null));
    };
  }, []);

  const [message, setMessage] = useState("");

  return (
    <ChatsWraper>
      <View className="w-full h-full bg-[#181C14]">
        {/* <ChatHeader navigateInfo={navigateInfo} /> */}
        <View className="w-full flex-auto relative">
          <View className="w-full flex-row gap-3 h-12 absolute bottom-5 flex items-center justify-center px-3">
            <TextInput
              onChangeText={(text) => setMessage(text)}
              value={message}
              className="flex-auto h-full bg-zinc-700 rounded-2xl px-3 text-white placeholder:text-white font-bold"
              placeholder="Type a message..."
              placeholderTextColor="white"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                sendMessage({
                  data: message,
                  id: navigateInfo.userPublicKey.decode_Key,
                })
              }
            >
              <Ionicons name="send" size={30} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ChatsWraper>
  );
};

export default ChatPage;

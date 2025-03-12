import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavigateInfo } from "@/src/utils/redux/slice/page/NavigateInfo";
import ChatsWraper from "@/src/wraper/ChatsWraper";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatHeader from "@/src/components/main/header/ChatHeader";
import usemessageSender from "../../hook/chats/text/usemessageSender";
import Socket from "@/src/utils/socket.io/Socket";
import useMessageReceiver from "@/src/hook/chats/text/useMessageRiciver";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { sendMessage } = usemessageSender();
  const navigateInfo = useSelector(
    (state: any) => state.NavigateInfo.navigateInfo
  );

  const { textMessageDecoder } = useMessageReceiver();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      textMessageDecoder(data);
    };
    Socket.on("receive-message", handleReceiveMessage);
    return () => {
      Socket.off("receive-message", handleReceiveMessage); // Cleanup to prevent memory leaks
    };
  }, []);

  return (
    <ChatsWraper>
      <View className="w-full h-full bg-[#181C14]">
        <ChatHeader navigateInfo={navigateInfo} />

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
              onPress={() => {
                if (message.trim() === "") return; // Prevent sending empty messages

                sendMessage({
                  data: message,
                  id: navigateInfo.userPublicKey.decode_Key,
                  riciverMongoId: navigateInfo.userMongoId,
                });

                setMessage(""); // Clear input after sending
              }}
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

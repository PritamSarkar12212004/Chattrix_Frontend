import { View, Text, TouchableOpacity, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useSendText from "@/src/hooks/chat/text/useSendText";
import { useRouter } from "expo-router";

const ChatPlaceHolder = ({ userData, setAllTextMessage }: any) => {
  const router = useRouter()

  const [text, setText] = useState("");
  // call hooks 
  const { sendText } = useSendText()
  const senderFunc = () => {
    sendText(userData, text, setText, setAllTextMessage)
  }

  return (
    <View className="w-full px-4 bg-[#EBECF3] rounded-t-3xl py-5 flex-row items-center gap-3 justify-between">
      <View className="flex-row items-center gap-3">
        <TouchableOpacity>
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} onPress={() => router.push("/(helper)")}>
          <Entypo name="images" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-auto">
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}

          keyboardType="twitter"
          className="w-full bg-[#d1d2db] h-14 rounded-full px-4 text-xl placeholder:text-xl"
          placeholder="Message"
        />
      </View>
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => senderFunc()}>
          <MaterialCommunityIcons name="send" size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatPlaceHolder;

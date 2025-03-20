import { View, Text, Image } from "react-native";
import React from "react";
import { userContext } from "@/src/utils/context/ContextApi";
import TimeConvater from "@/src/functions/timeConvater/TimeConvater";

const ShowChat = ({ item }: any) => {
  const { userDataLocalTemp } = userContext()

  return (
    <View className={`w-full flex-row items-center gap-3 ${item.textSender._id === userDataLocalTemp._id ? 'justify-end ' : ' justify-start'}`}>
      <View className={`${item.textSender._id === userDataLocalTemp._id ? ' flex items-center justify-center' : 'hidden'}`}>
        <Text className="text-zinc-600 text-sm">{TimeConvater(item.createdAt)}</Text>
      </View>
      <View className={`${item.textSender._id === userDataLocalTemp._id ? ' hidden ' : 'flex items-center justify-center'}`}>
        <View>
          <Image source={{ uri: item.textSender.userProfilePic }} className="w-10 h-10 rounded-full" />
        </View>
      </View>

      <View className={`py-4 flex  flex-row max-w-[80%] items-center   px-10 mb-3  ${item.textSender._id === userDataLocalTemp._id ? 'rounded-t-2xl rounded-b-2xl bg-[#FFCF50]    rounded-br-none' : 'rounded-t-2xl rounded-b-2xl  bg-white  rounded-bl-none'}`}>
        <Text className="text-lg  tracking-tight leading-tight">{item.message}</Text>
      </View>
      <View className={`${item.textSender._id === userDataLocalTemp._id ? ' hidden' : 'flex'}`}>
        <Text className="text-zinc-600 text-sm">{TimeConvater(item.createdAt)}</Text>
      </View>

    </View>
  );
};

export default ShowChat;

import { View, Text, Image } from "react-native";
import React from "react";
import SafeWraper from "@/src/wraper/SafeWraper";
import Backgrounds from "@/src/constant/backgrounds/Backgrounds";
import Button from "@/src/components/auth/Buttons/Button";
import useClarckSing from "@/src/hook/auth/useClarckSing";

const index = () => {
  const { onPress } = useClarckSing();

  return (
    <SafeWraper>
      <View className="w-full h-full bg-white flex items-center justify-between">
        <View className="w-full flex h-[65%]">
          <Image
            source={Backgrounds.authBackground}
            className="w-full h-full"
          />
        </View>
        <View className="h-[35%] w-full  relative">
          <View className="w-full h-full flex items-center px-3 pt-10 justify-between  bg-white absolute bottom-14 rounded-t-[40px]">
            <View>
              <Text className="text-3xl font-thin tracking-widest">
                Embrace Your Chats
              </Text>
              <Text className="text-3xl font-thin tracking-widest">
                Journey with chattrix
              </Text>
            </View>
            <View className="w-full flex items-center justify-center px-16">
              <Text className="text-xs font-thin tracking-widest text-center">
                Communicate globally secure connection & end to end encryption
              </Text>
            </View>
            <View className="w-full  px-5">
              <Button func={onPress} />
            </View>
          </View>
        </View>
      </View>
    </SafeWraper>
  );
};

export default index;

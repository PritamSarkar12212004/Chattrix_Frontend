import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SubPageNavigation from "@/src/components/subPage/navigation/SubPageNavigation";
import EditButton from "@/src/components/profilePage/EditButton";
import ToggleSwitch from "toggle-switch-react-native";
import useLogoutHook from "@/src/hooks/functions/remove/logout/useLogoutHook";
import { userContext } from "@/src/utils/context/ContextApi";

const ProfilePage = () => {
  const [enisEnabled, enetIsEnabled] = useState(false);
  const [noisEnabled, noetIsEnabled] = useState(false);

  // call hooks
  const { logoutProfile } = useLogoutHook();

  // context api
  const { userDataLocalTemp } = userContext();
  return (
    <SafeAreaView className="w-full h-full bg-[#121212]">
      <View className="w-full h-full px-3 ">
        <SubPageNavigation route={"Profile"} />
        <View className="w-full flex gap-3 ">
          <View className="w-full flex-row items-center mt-3 gap-5">
            <View className="">
              <Image
                source={{
                  uri: userDataLocalTemp?.userProfilePic
                    ? userDataLocalTemp.userProfilePic
                    : "https://i.pinimg.com/736x/9a/7b/40/9a7b4099d1a9d5ff523aa0ff4ea3536c.jpg",
                }}
                className="h-28 w-28 rounded-full"
              />
            </View>
            <View className="flex-auto flex-row items-center justify-between">
              <View className="flex items-center justify-center">
                <Text className="text-white text-lg font-bold leading-tight">
                  0
                </Text>
                <Text className="text-white text-xl font-bold leading-tight">
                  Posts
                </Text>
              </View>
              <View className="flex items-center justify-center">
                <Text className="text-white text-lg font-bold leading-tight">
                  0
                </Text>
                <Text className="text-white text-xl font-bold leading-tight">
                  Followers
                </Text>
              </View>
              <View className="flex items-center justify-center">
                <Text className="text-white text-lg font-bold leading-tight">
                  0
                </Text>
                <Text className="text-white text-xl font-bold leading-tight">
                  Following
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text className="text-white text-xl font-bold leading-tight">
              {userDataLocalTemp?.userName ? userDataLocalTemp.userName : null}
            </Text>
            <Text className="text-white text-xl  leading-tight">
              Phone:
              <Text className="text-zinc-300 text-xl leading-tight">
                {userDataLocalTemp?.userPhone
                  ? userDataLocalTemp.userPhone
                  : null}
              </Text>
            </Text>
          </View>
          <View className="w-full mt-5 flex items-center justify-center">
            <EditButton />
          </View>
        </View>
        <View className="w-full flex gap-3 mt-4">
          <View className="w-full flex-row items-center justify-between border-[1px] border-zinc-700 py-3 px-3 rounded-xl">
            <Text
              className={`${
                enisEnabled ? "text-white" : "text-zinc-400"
              } text-xl font-bold`}
            >
              Encryption
            </Text>
            <ToggleSwitch
              isOn={enisEnabled}
              onColor="green"
              offColor="red"
              size="medium"
              onToggle={() => enetIsEnabled(!enisEnabled)}
            />
          </View>
          <View className="w-full flex-row items-center justify-between border-[1px] border-zinc-700 py-3 px-3 rounded-xl">
            <Text
              className={`${
                noisEnabled ? "text-white" : "text-zinc-400"
              } text-xl font-bold`}
            >
              Notification
            </Text>
            <ToggleSwitch
              isOn={noisEnabled}
              onColor="green"
              offColor="red"
              size="medium"
              onToggle={() => noetIsEnabled(!noisEnabled)}
            />
          </View>
        </View>
        <View className="w-full ">
          <TouchableOpacity
            className="w-full h-14 bg-red-500 flex items-center justify-center rounded-3xl mt-10"
            onPress={() => logoutProfile()}
          >
            <Text className="text-white text-xl font-bold leading-tight text-center">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;

import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SubPageNavigation from "@/src/components/subPage/navigation/SubPageNavigation";
import UpdateButton from "@/src/components/profilePage/UpdateButton";
import useImagePikerHook from "@/src/hooks/functions/image/useImagePikerHook";
import useProfileUpdate from "@/src/hooks/functions/profile/update/useProfileUpdate";

const ProfileEditPage = () => {
  const [image, setImage] = useState(
    "https://i.pinimg.com/736x/9a/7b/40/9a7b4099d1a9d5ff523aa0ff4ea3536c.jpg"
  );
  const [name, setName] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  // call hook
  const { pikImage } = useImagePikerHook();
  const { updateProfile } = useProfileUpdate();
  const pickImage = () => {
    pikImage(setImage);
  };

  // update function
  const updateProfileFunc = () => {
    setBtnLoader(true);
    updateProfile(name, image, setBtnLoader);
  };
  return (
    <SafeAreaView className="w-full h-full bg-[#121212]">
      <View className="w-full h-full px-3  flex items-center  relative ">
        <SubPageNavigation route={"Edit Profile"} />
        <View className="w-full flex items-center justify-center mt-5">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => pickImage()}
            className=" h-56 w-56 rounded-full"
          >
            <Image
              source={{
                uri: image,
              }}
              className="h-56 w-56 rounded-full"
            />
          </TouchableOpacity>
          <View className="w-full flex gap-7 px-1">
            <View className="flex gap-2">
              <Text className="text-zinc-400 text-xl leading-tight">Name</Text>
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                className="w-full h-14  border-[1px] border-zinc-700 rounded-3xl px-4 text-white text-lg font-bold leading-tight"
                placeholder="jhon."
                placeholderTextColor={"#808080"}
              />
            </View>
          </View>
        </View>
        <View className="w-full flex items-center absolute bottom-10 justify-center">
          <UpdateButton
            content={"Update Profile"}
            ActiveFunction={updateProfileFunc}
            btnLoader={btnLoader}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEditPage;

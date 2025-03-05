import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import React from "react";
import useAddperson from "@/src/hook/chats/useAddperson";
import { useSelector } from "react-redux";

const ModalButton = ({ email }: any) => {
  const loader = useSelector((state: any) => state.buttonloader);
  const { addPersonApi } = useAddperson();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => addPersonApi({ email: email })}
      className="w-full h-14 flex items-center justify-center  bg-white rounded-3xl"
    >
      {loader ? (
        <ActivityIndicator color={"white"} size={"large"} />
      ) : (
        <Text className="text-black text-xl font-semibold">Add</Text>
      )}
    </TouchableOpacity>
  );
};

export default ModalButton;

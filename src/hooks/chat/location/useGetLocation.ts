import React, { useState } from "react";
import { userContext } from "@/src/utils/context/ContextApi";
import useSendText from "../text/useSendText";
import { useNavigation } from "expo-router";

const useGetLocation = () => {
  const { setAllTextMessage, userData } = userContext();
  const { sendText } = useSendText();
  const navigation = useNavigation();
  const [messag, setText] = useState("");
  const sendLocation = (location: any) => {
    const backFunction = () => {
      navigation.goBack();
    };
    sendText(userData, location, setText, setAllTextMessage, backFunction);
  };
  return { sendLocation };
};

export default useGetLocation;

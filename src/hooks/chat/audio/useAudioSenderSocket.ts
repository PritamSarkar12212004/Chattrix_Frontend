import { userContext } from "@/src/utils/context/ContextApi";
import useSendText from "../text/useSendText";
import { useState } from "react";
import { useNavigation } from "expo-router";

const useAudioSenderSocket = () => {
  const { setAllTextMessage } = userContext();
  const { sendText } = useSendText();
  const [messag, setText] = useState("");
  const navigation = useNavigation();
  const backFunction = () => {
    navigation.goBack();
  };
  const sendAudio = (userData: any, uploadedUrl: any) => {
    const data = {
      uploadedUrl: uploadedUrl,
    };
    sendText(userData, data, setText, setAllTextMessage, backFunction);
  };
  return {
    sendAudio,
  };
};

export default useAudioSenderSocket;

import { userContext } from "@/src/utils/context/ContextApi";
import { Contact } from "expo-contacts";
import useSendText from "../text/useSendText";
import { useState } from "react";
import { useNavigation } from "expo-router";

const useContactSender = () => {
  const { setAllTextMessage, userData } = userContext();
  const { sendText } = useSendText();
  const navigation = useNavigation();
  const [messag, setText] = useState("");
  const backFunction = () => {
    navigation.goBack();
  };

  const sendContacts = (item: Contact) => {
    sendText(userData, item, setText, setAllTextMessage, backFunction);
  };
  return { sendContacts };
};

export default useContactSender;

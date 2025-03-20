import Storage from "@/src/utils/mmkv/Storage";
import useRicivePushmeg from "./useRicivePushmeg";

const usePushMessage = () => {
  const { recivePushmeg } = useRicivePushmeg();
  const pushMessage = (contactId: any, messages: any) => {
    // Purana messages fetch karo
    let msgs = Storage.getString(`messages_${messages.textSender._id}`);
    let msgs2 = Storage.getString(`messages_${messages.textReceiver._id}`);
    let msgsArray = msgs ? JSON.parse(msgs) : [];
    let msgsArray2 = msgs2 ? JSON.parse(msgs2) : [];

    // Naya message push karo
    msgsArray.push(messages);
    msgsArray2.push(messages);

    // Ab updated array ko set karo
    Storage.set(
      `messages_${messages.textSender._id}`,
      JSON.stringify(msgsArray)
    );
    Storage.set(
      `messages_${messages.textReceiver._id}`,
      JSON.stringify(msgsArray2)
    );
    recivePushmeg(contactId);
  };

  return { pushMessage };
};

export default usePushMessage;

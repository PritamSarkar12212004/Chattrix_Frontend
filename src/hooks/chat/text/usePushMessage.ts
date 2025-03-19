import Storage from "@/src/utils/mmkv/Storage";

const usePushMessage = () => {
  const pushMessage = (contactId: any, messages: any) => {
    let msgs = Storage.getString(`messages_${contactId}`);
    let msgsArray = msgs ? JSON.parse(msgs) : [];
    msgsArray.push(messages); // Add new message to array
    Storage.set(`messages_${contactId}`, JSON.stringify(msgsArray));
    console.log(Storage.getString(`messages_${contactId}`));
  };

  return { pushMessage };
};

export default usePushMessage;

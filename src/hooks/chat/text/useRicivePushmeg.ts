import Storage from "@/src/utils/mmkv/Storage";

const useRicivePushmeg = () => {
  const recivePushmeg = (contactId: any, setAllTextMessage: any) => {
    let msgs = Storage.getString(`messages_${contactId}`);
    console.log(msgs ? JSON.parse(msgs) : []);
    setAllTextMessage(msgs ? JSON.parse(msgs) : []);
  };
  return { recivePushmeg };
};

export default useRicivePushmeg;

import { userContext } from "@/src/utils/context/ContextApi";
import Storage from "@/src/utils/mmkv/Storage";

const useRicivePushmeg = () => {
  const { setAllTextMessage } = userContext();
  const recivePushmeg = async (contactId: any) => {
    if (!contactId) return;
    let msgs = Storage.getString(`messages_${contactId}`);
    setAllTextMessage(msgs ? JSON.parse(msgs) : []);
  };
  return { recivePushmeg };
};

export default useRicivePushmeg;

import Token from "@/src/constant/token/Token";
import Storage from "@/src/utils/mmkv/Storage";

const RecentChatAdderFunc = (contact: any, setAllTextMessage: any) => {
  let chats = Storage.getString(Token.recentChat);
  let chatsArray = chats ? JSON.parse(chats) : [];

  const exists = chatsArray.find((c) => c._id === contact._id);
  if (!exists) {
    chatsArray.unshift(contact); // Naya contact top pe
    Storage.set(Token.recentChat, JSON.stringify(chatsArray));
    setAllTextMessage((prev: any) => [prev, ...prev]);
  }
};
export default RecentChatAdderFunc;

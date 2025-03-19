import Token from "@/src/constant/token/Token";
import Storage from "@/src/utils/mmkv/Storage";

const RecentChatGet = () => {
  let chats = Storage.getString(Token.recentChat);
  return chats ? JSON.parse(chats) : [];
};

export default RecentChatGet;

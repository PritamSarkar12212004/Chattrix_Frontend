import { userContext } from "@/src/utils/context/ContextApi";
import Socket from "@/src/utils/socket/Socket";
import RecentChatAdderFunc from "../../functions/recentChat/RecentChatAdderFunc";

const useAudioSender = () => {
  const { userDataLocalTemp } = userContext();
  // call hooks

  const sendText = async (
    riciver: any,
    message: any,
    setAllTextMessage: any,
    backFunction: any
  ) => {
    Socket.emit("send-message", {
      message: message,
      receiverMongoId: riciver._id,
      senderMongoId: userDataLocalTemp._id,
    });
    RecentChatAdderFunc(riciver, setAllTextMessage);
    backFunction && backFunction();
  };
  return {
    sendText,
  };
};

export default useAudioSender;

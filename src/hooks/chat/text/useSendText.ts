import { userContext } from "@/src/utils/context/ContextApi";
import Socket from "@/src/utils/socket/Socket";
import RecentChatAdderFunc from "../../functions/recentChat/RecentChatAdderFunc";

const useSendText = () => {
  const { userDataLocalTemp } = userContext();
  // call hooks
  const sendText = async (
    riciver: any,
    message: any,
    setText: any,
    setAllTextMessage: any,
    backFunction: any
    
  ) => {
    Socket.emit("send-message", {
      message: message,
      receiverMongoId: riciver._id,
      senderMongoId: userDataLocalTemp._id,
    });
    RecentChatAdderFunc(riciver, setAllTextMessage);
    setText("");
    backFunction && backFunction();
  };
  return {
    sendText,
  };
};

export default useSendText;

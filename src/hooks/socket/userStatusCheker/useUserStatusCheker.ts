import { userContext } from "@/src/utils/context/ContextApi";
import Socket from "../../../utils/socket/Socket";

const useUserStatusCheker = () => {
  const { userDataLocalTemp } = userContext();
  const userStatusCheker = (payloadId: any) => {
    Socket.emit("user-status-chaker", {
      chekerRequestid: userDataLocalTemp._id,
      payloadId: payloadId._id,
    });
  };
  return { userStatusCheker };
};

export default useUserStatusCheker;

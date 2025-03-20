import Socket from "@/src/utils/socket/Socket";

const useGetUserStatus = () => {
  const checkStatus = (setUserStatus: any) => {
    Socket.on("get-user-status", (data) => {
      setUserStatus(data);
    });
  };
  const statusChekerOff = () => {
    Socket.off("get-user-status");
  };
  return { checkStatus, statusChekerOff };
};

export default useGetUserStatus;

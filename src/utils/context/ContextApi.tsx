import { createContext, useContext, useEffect, useState } from "react";
import Storage from "../mmkv/Storage";
import Token from "@/src/constant/token/Token";
const Context = createContext();
export const ContextProvider = ({ children }: any) => {
  // state
  const [tempOtp, settempOtp] = useState(null);
  const [tempPhoneNumber, settempPhoneNumber] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  //userData local Refresher
  const [userDataLocalRefresh, setUserDataLocalRefresh] = useState(null);

  // userData get from storage for the the information
  const [userDataLocalTemp, setUserDataLocalTemp] = useState(null);

  // chatList  get from Server  for the the information temp
  const [chatListTemp, setChatListTemp] = useState(null);

  // text cgat load
  const [allTextMessage, setAllTextMessage] = useState([]);

  useEffect(() => {
    const userData = async () => {
      const data = await JSON.parse(Storage.getString(Token.userMainData));
      setUserDataLocalTemp(data);
    };
    userData();
    return () => {
      setUserDataLocalTemp(null);
    };
  }, [userDataLocalRefresh]);

  return (
    <Context.Provider
      value={{
        tempOtp,
        settempOtp,
        loadingAuth,
        setLoadingAuth,
        tempPhoneNumber,
        settempPhoneNumber,
        userDataLocalTemp,
        setUserDataLocalTemp,
        setUserDataLocalRefresh,
        chatListTemp,
        setChatListTemp,
        userDataLocalRefresh,
        allTextMessage, setAllTextMessage
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const userContext = () => useContext(Context);

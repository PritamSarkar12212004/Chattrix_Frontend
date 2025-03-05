import AxiosInstance from "@/src/utils/axios/AxiosInstance";
import { setLoader } from "@/src/utils/redux/slice/loader/buttonloader";
import { setChatList } from "@/src/utils/redux/slice/chat/chatlist/chatList";
import { useDispatch } from "react-redux";
import Storage from "@/src/utils/mmkv/Storage";
import chatToken from "@/src/constant/chat/ChatToken";

const useAddperson = () => {
  const dispatch = useDispatch();

  const storeDataMmkv = (data: any) => {
    const storeChats = Storage.getString(chatToken.chatList);
    const existingChats = storeChats ? JSON.parse(storeChats) : [];
    existingChats.push(data);
    Storage.set(chatToken.chatList, JSON.stringify(existingChats));
  };
  const addPersonApi = ({ email }: any) => {
    dispatch(setLoader(true));

    AxiosInstance.post("/chat/add-person-api", {
      email: email,
    })
      .then((res) => {
        dispatch(setChatList([res.data.data])); // Pass array, as reducer spreads it
        storeDataMmkv(res.data.data);
        dispatch(setLoader(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoader(false));
      });
  };
  return { addPersonApi };
};

export default useAddperson;

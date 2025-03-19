import Token from "@/src/constant/token/Token";
import AxiosInstance from "@/src/utils/axios/AxiosInstance";
import Storage from "@/src/utils/mmkv/Storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

const useUserRegisterHook = () => {
  const router = useRouter();
  const registerUser = async (phone: any, setloader: any) => {
    AxiosInstance.post("/user-auth/login", {
      phone,
    })
      .then((res) => {
        Storage.set(Token.userMainData, JSON.stringify(res.data.user));
        setloader(false);
        router.replace("/(main)");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "register user Error");
      });
  };
  return { registerUser };
};

export default useUserRegisterHook;

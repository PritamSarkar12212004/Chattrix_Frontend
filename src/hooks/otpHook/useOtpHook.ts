import { Alert } from "react-native";
import AxiosInstance from "@/src/utils/axios/AxiosInstance";
import { userContext } from "@/src/utils/context/ContextApi";
import { useNavigation } from "expo-router";

const useOtpHook = () => {
  const { settempOtp, loadingAuth, setLoadingAuth } = userContext();
  const navigation = useNavigation();
  const callOtp = async () => {
    AxiosInstance.post("/utl/send-otp")
      .then((res) => {
        settempOtp(res.data.otp);
        setLoadingAuth(!loadingAuth);
        navigation.navigate("Varification");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("otp Faild");
        setLoadingAuth(!loadingAuth);
      });
  };
  return { callOtp };
};

export default useOtpHook;

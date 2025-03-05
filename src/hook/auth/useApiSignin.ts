import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
import AxiosInstance from "@/src/utils/axios/AxiosInstance";
import Storage from "@/src/utils/mmkv/Storage";
import { useUser } from "@clerk/clerk-expo";

import { useRouter } from "expo-router";
const useApiSignin = () => {
  const router = useRouter();
  const { user } = useUser();
  const apiBackendLogin = () => {
    AxiosInstance.post("/login/user-api", {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName,
      image: user?.imageUrl,
    })
      .then((res) => {
        const userInfo = {
          userName: res.data.user.userName || null,
          userImage: res.data.user.userProfilePic || null,
          userEmail: res.data.user.userEmail || null,
        };
        const userKey = {
          userPrivateKey: res.data.user.userPrivateKey.decode_Key,
          userPublicKey: res.data.user.userPublicKey.decode_Key,
        };
        Storage.set(AuthTokenName.userInfo, JSON.stringify(userInfo));
        Storage.set(AuthTokenName.userId, JSON.stringify(userKey));
        router.replace("/(main)");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return { apiBackendLogin };
};

export default useApiSignin;


import Storage from "@/src/utils/mmkv/Storage";
import { useRouter } from "expo-router";

const useLogoutHook = () => {
  const router = useRouter();
  const logoutProfile = async () => {
    Storage.clearAll();
    router.replace("/(auth)");
  };
  return { logoutProfile };
};

export default useLogoutHook;

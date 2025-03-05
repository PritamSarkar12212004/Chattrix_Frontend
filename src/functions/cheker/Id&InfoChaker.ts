import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
import Storage from "@/src/utils/mmkv/Storage";
const userInfo = Storage.getString(AuthTokenName.userInfo);
const userid = Storage.getString(AuthTokenName.userId);
export { userInfo, userid };

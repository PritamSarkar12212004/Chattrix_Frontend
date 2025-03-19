import Storage from "@/src/utils/mmkv/Storage";
import useimageCloudaneryUploadHooj from "../../image/upload/useimageCloudaneryUploadHooj";
import Token from "@/src/constant/token/Token";
import AxiosInstance from "@/src/utils/axios/AxiosInstance";
import { Alert } from "react-native";
import { useNavigation } from "expo-router";
import { userContext } from "@/src/utils/context/ContextApi";

const useProfileUpdate = () => {
  const navigation = useNavigation();
  const { setUserDataLocalRefresh } = userContext();
  const { uploadImage } = useimageCloudaneryUploadHooj();
  const updateProfile = async (name: any, image: any, setBtnLoader: any) => {
    const uploadIage = await uploadImage(image);
    const userId = await JSON.parse(Storage.getString(Token.userMainData))._id;
    AxiosInstance.post("/user-profile/profile-info-update", {
      data: {
        userProfilePic: uploadIage,
        userName: name,
        userId: userId,
      },
    })
      .then((res) => {
        Storage.set(Token.userMainData, JSON.stringify(res.data.user));
        setUserDataLocalRefresh(new Date());
        setBtnLoader(false);
        navigation.goBack();
      })
      .catch((err) => {
        setBtnLoader(false);
        console.log(err);
        Alert.alert("Error", "Something went wrong update profile");
      });
  };
  return {
    updateProfile,
  };
};

export default useProfileUpdate;

import { useEffect, useState } from "react";
import useImageCompressor from "../functions/image/compressor/useImageCompressor";
import useImageCloudinaryUploadHook from "../functions/image/upload/useimageCloudaneryUploadHooj";
import { userContext } from "@/src/utils/context/ContextApi";
import useSendText from "../chat/text/useSendText";
import { useNavigation, useRouter } from "expo-router";

const useImageTextSender = () => {
  const navigation = useNavigation();
  // Hooks
  const { compressImage } = useImageCompressor();
  const { uploadImage } = useImageCloudinaryUploadHook();
  const { userData, setAllTextMessage } = userContext();
  const { sendText } = useSendText();

  // State
  const [image, setImage] = useState(null);
  const [tempText, setTempText] = useState("");
  const [tempSetText, setTempSetText] = useState<any>(null); // You may type it better if needed
  const backFunction = () => {
    navigation.goBack();
  };

  // 1️⃣ Trigger image compression
  const sendTextImage = (
    selectedImage: any,
    text: any,
    setText: any,
    setLoader: any
  ) => {
    setTempText(text); // store text temporarily
    setTempSetText(() => setText); // store setText temporarily
    compressImage(selectedImage, setImage);
  };

  // 2️⃣ Upload image and send text
  const UploadtoCloudanery = async () => {
    const ImageUri = await uploadImage(image);
    const data = {
      image: ImageUri,
      text: tempText,
    };
    sendText(userData, data, tempSetText, setAllTextMessage, backFunction);
  };

  // 3️⃣ Effect - trigger upload after image compression
  useEffect(() => {
    if (image) {
      UploadtoCloudanery();
    }
  }, [image]);

  return { sendTextImage };
};

export default useImageTextSender;

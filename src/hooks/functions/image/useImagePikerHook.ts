import * as ImagePicker from "expo-image-picker";
import useImageCompressor from "./compressor/useImageCompressor";
const useImagePikerHook = () => {
  const { compressImage } = useImageCompressor();
  const pikImage = async (setImage: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      selectionLimit: 1,
    });
    compressImage(result.assets[0].uri, setImage);
  };
  return { pikImage };
};

export default useImagePikerHook;

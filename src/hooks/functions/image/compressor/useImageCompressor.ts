import { Image } from "react-native-compressor";

const useImageCompressor = () => {
  const compressImage = async (imagePath: any, setImage: any) => {
    const result = await Image.compress(imagePath, {
      progressDivider: 10,
      quality: 0.5,
    });

    setImage(result);
  };
  return { compressImage };
};

export default useImageCompressor;

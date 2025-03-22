import axios from "axios";
import { Alert } from "react-native";

const useAudioCloudunirysend = () => {
  const getMimeType = (extension: string): string => {
    const map: { [key: string]: string } = {
      mp3: "audio/mpeg",
      wav: "audio/wav",
      aac: "audio/aac",
      m4a: "audio/mp4",
      ogg: "audio/ogg",
    };
    return map[extension.toLowerCase()] || "audio/mpeg";
  };

  const uploadAudio = async (
    audioUri: string,
    setUploadProgress: (progress: number) => void
  ): Promise<string | null> => {
    try {
      // Extract extension
      const match = audioUri.match(/\.(\w+)$/);
      const fileExtension = match ? match[1].toLowerCase() : "mp3";
      const fileType = getMimeType(fileExtension);

      // Form Data
      const data = new FormData();
      data.append("file", {
        uri: audioUri,
        type: fileType,
        name: `audio_${Date.now()}.${fileExtension}`,
      } as any);

      data.append("upload_preset", "Chattrix");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dpstw5idt/video/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(`Audio Upload Progress: ${percentCompleted}%`);
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.secure_url) {
        console.log(
          "Audio Upload Successful ✅ URL:",
          response.data.secure_url
        );
        return response.data.secure_url;
      } else {
        Alert.alert("Upload Failed", "No URL returned");
        return null;
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Alert.alert("Upload Error", "Something went wrong");
      return null;
    }
  };

  return { uploadAudio };
};

export default useAudioCloudunirysend;

import { View, Text, Alert } from "react-native";
import React from "react";

const useimageCloudaneryUploadHooj = () => {
  const uploadImage = async (imageUri: any) => {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg", // Adjust if needed
      name: `image_${Date.now()}.jpg`,
    });
    data.append("upload_preset", "Chattrix");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dpstw5idt/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.json();
      if (result.secure_url) {
        return result.secure_url;
      } else {
        Alert.alert(`Failed to upload`);
        return null;
      }
    } catch (error) {
      console.error(`Upload error for :`, error);
      return null;
    }
  };
  return { uploadImage };
};

export default useimageCloudaneryUploadHooj;

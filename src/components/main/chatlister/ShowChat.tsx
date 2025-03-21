import { View, Text, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { userContext } from "@/src/utils/context/ContextApi";
import TimeConvater from "@/src/functions/timeConvater/TimeConvater";

const ShowChat = ({ item }: any) => {
  const { userDataLocalTemp } = userContext();
  const isCurrentUser = item.textSender._id === userDataLocalTemp._id;
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Handle image size
  useEffect(() => {
    if (item?.messageImage) {
      Image.getSize(
        item.messageImage,
        (width, height) => {
          const maxWidth = 250; // max width
          const scaleFactor = width > maxWidth ? maxWidth / width : 1;
          setImageSize({
            width: width * scaleFactor,
            height: height * scaleFactor,
          });
        },
        (error) => {
          console.log("Error loading image:", error);
        }
      );
    }
  }, [item?.messageImage]);

  return (
    <View
      className={`w-full flex-row items-center gap-3 ${
        isCurrentUser ? "justify-end" : "justify-start"
      } mb-2`}
    >
   

      {/* Message Box */}
      <View
        className={`py-3 px-4 max-w-[80%] ${
          isCurrentUser
            ? "bg-[#FFCF50] rounded-t-2xl rounded-b-2xl rounded-br-none"
            : "bg-white rounded-t-2xl rounded-b-2xl rounded-bl-none"
        }`}
      >
        {/* Image Message */}
        {item?.messageImage && imageSize.width && imageSize.height ? (
          <Image
            source={{ uri: item.messageImage }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              borderRadius: 10,
              marginBottom: 5,
            }}
          />
        ) : item?.messageImage ? (
          <ActivityIndicator size="small" color="#000" />
        ) : null}

        {/* Text Message */}
        {item.message ? (
          <Text className="text-lg tracking-tight leading-tight">
            {item.message}
          </Text>
        ) : null}
      </View>

    </View>
  );
};

export default ShowChat;

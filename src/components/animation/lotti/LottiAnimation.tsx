import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";

const LottiAnimation = ({ width, height, source, bgColor }: any) => {
  const animation = useRef<LottieView>(null);
  return (
    <LottieView
      autoPlay
      ref={animation}
      style={{
        width: width,
        height: height,
        backgroundColor: bgColor,
      }}
      source={source}
    />
  );
};

export default LottiAnimation;

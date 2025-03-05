import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  disconnectSocketIo,
  connectSocketIo,
} from "../../utils/socket.io/SocketIo";

const _layout = () => {
  const connectIo = () => {
    // connectSocketIo();
  };
  useEffect(() => {
    connectIo();
  }, []);
  return (
    <View>
      <Text>_layout</Text>
    </View>
  );
};

export default _layout;

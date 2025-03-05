import { io } from "socket.io-client";

// const socket = io("http://192.168.1.7:3000", { transports: ["websocket"] });
const connectSocketIo = () => {
  // socket.on("connect", () => {
  //   console.log("Connected:", socket.id);
  // });
};

const disconnectSocketIo = () => {
  // socket.disconnect();
};

export { connectSocketIo, disconnectSocketIo };

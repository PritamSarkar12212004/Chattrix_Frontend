import "react-native-get-random-values"; // Import this first!
import nacl from "tweetnacl";
import { encodeBase64, decodeUTF8 } from "tweetnacl-util";
import Storage from "@/src/utils/mmkv/Storage";
import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
import Socket from "@/src/utils/socket.io/Socket";

const useMessageSender = () => {
  const sendMessage = ({
    data,
    id,
    riciverMongoId,
  }: {
    data: string;
    id: any;
    riciverMongoId: any;
  }) => {
    // get user id
    const userIdString = Storage.getString(AuthTokenName.userId);
    if (!userIdString) {
      throw new Error("User ID not found in storage");
    }
    const senderKeys = JSON.parse(userIdString);
    const senderPrivateKey = new Uint8Array(
      Object.values(senderKeys.userPrivateKey)
    );
    const senderPublicKey = new Uint8Array(
      Object.values(senderKeys.userPublicKey)
    );
    console.log(senderPrivateKey,senderPublicKey);
    const receiverPublicKey = new Uint8Array(Object.values(id));

    //  accept function
    mainFunction({
      senderPrivateKey: senderPrivateKey,
      receiverPublicKey: receiverPublicKey,
      data: data,
      senderPublicKey: senderPublicKey,
      riciverMongoId: riciverMongoId,
    });
  };
  return { sendMessage };
};

// encrypt message
const mainFunction = ({
  senderPrivateKey,
  receiverPublicKey,
  data,
  riciverMongoId,
}: any) => {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageDecoded = decodeUTF8(data);
  const encryptedMessage = nacl.box(
    messageDecoded,
    nonce,
    receiverPublicKey,
    senderPrivateKey
  );

  // two time encryption for convert into base64
  const encryptMessage = encodeBase64(encryptedMessage);
  /// const encryptMessage = encodeBase64(encryptedMessage);
  const enonce = encodeBase64(nonce);
  Socket.emit("send-message", {
    encryptMessage: encryptMessage,
    enonce: enonce,
    senderKey: encodeBase64(receiverPublicKey),
    receiverMongoId: riciverMongoId,
    senderMongoId: JSON.parse(Storage.getString(AuthTokenName.socketId)),
  });
};

export default useMessageSender;

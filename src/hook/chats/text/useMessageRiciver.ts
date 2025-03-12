import nacl from "tweetnacl";
import { decodeBase64, encodeUTF8 } from "tweetnacl-util";
import Storage from "@/src/utils/mmkv/Storage";
import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";

const useMessageReceiver = () => {
  const textMessageDecoder = (data: any) => {
    const { message, nonce, senderPublicKey } = data;

    // Get receiver's private key from storage
    const userIdString = Storage.getString(AuthTokenName.userId);
    if (!userIdString) {
      throw new Error("User ID not found in storage");
    }
    const receiverKeys = JSON.parse(userIdString);
    const receiverPrivateKey = new Uint8Array(
      Object.values(receiverKeys.userPrivateKey)
    );

    // Convert Base64 encoded values to Uint8Array
    const decodedSenderPublicKey = new Uint8Array(
      Object.values(decodeBase64(senderPublicKey))
    );
    const decodedNonce = decodeBase64(nonce);
    const decodedMessage = decodeBase64(message);

    // Decrypt Message
    const decryptedMessage = nacl.box.open(
      decodedMessage,
      decodedNonce,
      decodedSenderPublicKey,
      receiverPrivateKey
    );

    if (!decryptedMessage) {
      throw new Error("Decryption failed");
    }

    // Convert to UTF-8 string
    const finalMessage = encodeUTF8(decryptedMessage);

    const returnData = {
      message: finalMessage,
      reciveTime: data.createdAt,
      textSender: {
        id: data.textSender._id,
        userEmail: data.textSender.userEmail,
        userName: data.textSender.userName,
        userProfilePic: data.textSender.userProfilePic,
      },
      textReceiver: {
        id: data.textReceiver._id,
        userEmail: data.textReceiver.userEmail,
        userName: data.textReceiver.userName,
        userProfilePic: data.textReceiver.userProfilePic,
      },
    };
    return returnData;
  };

  return { textMessageDecoder };
};

export default useMessageReceiver;

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

    console.log(decryptedMessage);
    if (!decryptedMessage) {
      throw new Error("Decryption failed");
    }

    // Convert to UTF-8 string
    const finalMessage = encodeUTF8(decryptedMessage);
    console.log(finalMessage);

    // Console log the full decrypted data
    console.log({
      decryptedMessage: finalMessage,
      senderPublicKey: senderPublicKey,
      receiverPrivateKey: receiverPrivateKey,
      nonce: nonce,
    });

    return finalMessage;
  };

  return { textMessageDecoder };
};

export default useMessageReceiver;

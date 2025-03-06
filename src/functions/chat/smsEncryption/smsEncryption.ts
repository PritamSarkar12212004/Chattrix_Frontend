import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
import Storage from "@/src/utils/mmkv/Storage";
import nacl from "tweetnacl";
import pkg from "tweetnacl-util";

const { encodeBase64, decodeBase64 } = pkg;

const smsEncryption = async ({ data, id }: any) => {
  const senderIdString = Storage.getString(AuthTokenName.userId);
  if (!senderIdString) {
    throw new Error("User private key not found in Storage!");
  }

  const senderId = JSON.parse(senderIdString);

  // Convert keys
  const senderPrivateKey = decodeBase64(senderId.userPrivateKey);
  const receiverPublicKey = decodeBase64(id);

  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageUint8 = new TextEncoder().encode(data);

  const encryptedMessage = nacl.box(
    messageUint8,
    nonce,
    receiverPublicKey,
    senderPrivateKey
  );

  return senderPrivateKey;
};

export default smsEncryption;

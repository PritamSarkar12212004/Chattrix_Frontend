import "react-native-get-random-values"; // Import this first!
import nacl from "tweetnacl";
import { encodeBase64, decodeUTF8 } from "tweetnacl-util";
import Storage from "@/src/utils/mmkv/Storage";
import AuthTokenName from "@/src/constant/auth/authTokenName/AuthTokenName";
import AxiosInstance from "@/src/utils/axios/AxiosInstance";

const useMessageSender = () => {
  const sendMessage = ({ data, id }: { data: string; id: any }) => {
    const senderKeys = JSON.parse(Storage.getString(AuthTokenName.userId));
    const senderPrivateKey = new Uint8Array(
      Object.values(senderKeys.userPrivateKey)
    );
    const senderPublicKey = new Uint8Array(
      Object.values(senderKeys.userPublicKey)
    );
    const receiverPublicKey = new Uint8Array(Object.values(id));

    mainFunction({
      senderPrivateKey: senderPrivateKey,
      receiverPublicKey: receiverPublicKey,
      data: data,
      senderPublicKey: senderPublicKey,
    });
  };
  return { sendMessage };
};

const mainFunction = ({
  senderPrivateKey,
  receiverPublicKey,
  data,
  senderPublicKey,
}: any) => {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageDecoded = decodeUTF8(data);
  const encryptedMessage = nacl.box(
    messageDecoded,
    nonce,
    receiverPublicKey,
    senderPrivateKey
  );
  const encryptMessage = encodeBase64(encryptedMessage);
  const enonce = encodeBase64(nonce);
  AxiosInstance.post("/chat/send-text-api", {
    data: encryptMessage,
    nonce: enonce,
    id: senderPublicKey,
  });
};

export default useMessageSender;

import usePushMessage from "./usePushMessage";

const useTextRicever = () => {
  const { pushMessage } = usePushMessage();
  const reciveText = (reciveData: any) => {
    pushMessage(reciveData.textReceiver._id, reciveData);
  };
  return { reciveText };
};

export default useTextRicever;

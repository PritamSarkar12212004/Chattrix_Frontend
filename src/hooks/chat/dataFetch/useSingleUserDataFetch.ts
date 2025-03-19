import AxiosInstance from "@/src/utils/axios/AxiosInstance";

const useSingleUserDataFetch = () => {
  const dataFetch = async (number: any, setUserData: any) => {
    await AxiosInstance.post("/chat-fetch/single-chat-userData-Fetch", {
      number: number,
    })
      .then((result) => {
        setUserData(result.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { dataFetch };
};

export default useSingleUserDataFetch;

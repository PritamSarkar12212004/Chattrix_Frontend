import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatpageNavigation from "@/src/components/main/navigation/ChatpageNavigation";
import ShowChat from "@/src/components/main/chatlister/ShowChat";
import ChatPlaceHolder from "@/src/components/main/chatPlaceHolder/ChatPlaceHolder";
import { userContext } from "@/src/utils/context/ContextApi";
import useSingleUserDataFetch from "@/src/hooks/chat/dataFetch/useSingleUserDataFetch";
import useRicivePushmeg from "@/src/hooks/chat/text/useRicivePushmeg";
import BottomSheetExpo from "@/src/components/BottomSheet/BottomSheetExpo";
import useBottomSheetProp from "@/src/hooks/BottomSheet/useBottomSheetProp";
import ChatpageBottomSheet from "@/src/components/BottomSheet/chatBottomSheete/ChatpageBottomSheet";

const ChatPage = () => {
  const { chatListTemp, setChatListTemp, allTextMessage, setAllTextMessage, userData, setUserData } = userContext();
  const { dataFetch } = useSingleUserDataFetch();

  // call hooks
  const { recivePushmeg } = useRicivePushmeg();

  const [loading, setLoading] = useState(false); // For loading indicator
  const [page, setPage] = useState(1); // Pagination page

  const flatListRef = useRef(null);
  const isFirstLoad = useRef(true); // Track first load
  const [show, setShow] = useState(false); // For showing loader

  // Sync Data
  const SynceData = async () => {


    if (!chatListTemp?.contactType) {
      setUserData(chatListTemp);
      loadAllTextMessagData(chatListTemp.id);
    } else {
      const number = await chatListTemp.phoneNumbers[0].number;
      dataFetch(number, setUserData);
    }

  };

  // Load messages function
  const loadAllTextMessagData = (id, pageNum = 1) => {
    setLoading(true);
    recivePushmeg(id, setAllTextMessage, pageNum, () => setLoading(false));
  };


  // First load
  useEffect(() => {
    SynceData();
    setTimeout(() => {
      setShow(true);
    }, 100);
    return () => {
      setUserData(null);
      setChatListTemp(null);
    };

  }, []);

  // Load messages when userData changes or page increases
  useEffect(() => {

    if (userData) {
      loadAllTextMessagData(userData._id, page);
    }
  }, [userData, page]);

  // Auto-scroll to bottom on first load
  useEffect(() => {
    if (flatListRef.current && allTextMessage.length > 0 && isFirstLoad.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      isFirstLoad.current = false;
    }
  }, [allTextMessage]);

  // Load more messages when reached end
  const handleLoadMore = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };


  // call hooks
  const { SemiOpen, snapPoints, bottomSheetRef } = useBottomSheetProp();

  return (
    <SafeAreaView className="bg-[#2CB1A9] h-full">
      <View className="w-full h-full relative">
        <ChatpageNavigation userData={userData} />
        <View className="w-full flex-1">
          <View className="w-full px-3 pt-2 pb-24">
            {
              show ? <FlatList
                ref={flatListRef}
                data={[...allTextMessage].reverse()} // Reverse to show latest at bottom
                showsVerticalScrollIndicator={false}
                inverted
                keyExtractor={(item, index) => index.toString()} // Use unique id
                renderItem={({ item }) => <ShowChat item={item} />}
                onEndReached={handleLoadMore}
                // onEndReachedThreshold={0.5}
                initialNumToRender={10}
                maxToRenderPerBatch={20}
                windowSize={10}
                extraData={allTextMessage.length} // Only length (optional)

              /> : null
            }

          </View>
        </View>
        <View className="w-full absolute bottom-0">
          <ChatPlaceHolder userData={userData} setAllTextMessage={setAllTextMessage} SemiOpen={SemiOpen} />
        </View>
      </View>
      <BottomSheetExpo snapPoints={snapPoints} bottomSheetRef={bottomSheetRef} >
        <ChatpageBottomSheet bottomSheetRef={bottomSheetRef} />
      </BottomSheetExpo>
    </SafeAreaView>
  );
};

export default ChatPage;

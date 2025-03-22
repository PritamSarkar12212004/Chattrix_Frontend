import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef } from "react";

const useBottomSheetProp = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "50%"], []);

  const SemiOpen = () => {
    bottomSheetRef.current?.snapToIndex(0);
  };
  return {
    SemiOpen,
    snapPoints,
    bottomSheetRef
  };
};

export default useBottomSheetProp;

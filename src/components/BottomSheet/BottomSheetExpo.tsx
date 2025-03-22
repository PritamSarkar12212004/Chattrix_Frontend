import { StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import BottomSheet, { BottomSheetView, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';

const BottomSheetExpo = ({ children, bottomSheetRef, snapPoints }: any) => {
    const handleSheetChanges = useCallback((index: number) => {
        console.log('BottomSheet index:', index);
    }, []);
    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.1,
        restSpeedThreshold: 0.1,
        stiffness: 500,
        
    });

    return (
        <BottomSheet
            ref={bottomSheetRef}
            animationConfigs={animationConfigs}

            enableHandlePanningGesture={false}
            onChange={handleSheetChanges}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
        >
            <BottomSheetView style={styles.contentContainer}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
});

export default BottomSheetExpo;

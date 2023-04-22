import { useContext } from 'react';

import { BottomSheetContext } from 'lib/contexts/bottom-sheet';

export const useBottomSheet = () => {
  const { bottomSheetRef, setBottomSheetRef } = useContext(BottomSheetContext);

  return {
    bottomSheetRef,
    setBottomSheetRef,
  };
};

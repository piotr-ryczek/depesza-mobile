import React, { createContext, useState, useRef, ReactNode } from 'react';

export const BottomSheetContext = createContext({
  bottomSheetRef: null,
  setBottomSheetRef: null,
});

export const BottomSheetConsumer = BottomSheetContext.Consumer;

type BottomSheetProviderProps = {
  children: ReactNode;
};

export const BottomSheetProvider = (props: BottomSheetProviderProps) => {
  const { children } = props;

  const [bottomSheetRef, setBottomSheetRef] = useState();

  return (
    // @ts-ignore
    <BottomSheetContext.Provider value={{ bottomSheetRef, setBottomSheetRef }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

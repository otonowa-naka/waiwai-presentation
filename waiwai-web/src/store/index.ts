import { configureStore } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux';

import roomIdReducer from './roomSlice';

export const store = configureStore({
  reducer: {
    //　Sliceを追加した場合は、ここに追加していく
    roomID: roomIdReducer
  },
});

export type AppDispatch = typeof store.dispatch;

//　useSelecterをToolKit向けに再定義
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

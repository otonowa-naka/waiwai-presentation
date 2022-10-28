import { configureStore } from '@reduxjs/toolkit';
import { useSelector as rawUseSelector, TypedUseSelectorHook ,useDispatch } from 'react-redux';

import roomIdReducer from './roomSlice';

export const store = configureStore({
  reducer: {
    //　Sliceを追加した場合は、ここに追加していく
    room: roomIdReducer
  },
});

export type AppDispatch = typeof store.dispatch;
//　useSelecterをToolKit向けに再定義
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

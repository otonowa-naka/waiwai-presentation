
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

//　Stateの型定義
type State = {
 roomId: string
}

//　初期値
const initialState:State = 
{
  roomId:""
}

export const roomSlice = createSlice({
  name: 'roomId',
  initialState,
  reducers: {
    
    //　部屋を新規に作成
    createNew: (state:State) => {
      state.roomId = "newId";
    },

    //　既存の部屋に入室
    setId: (state:State, actton:PayloadAction<string>) => {
      state.roomId = actton.payload;
    },
  },
});

// アクションの外部定義
export const { createNew, setId } = roomSlice.actions;
export default roomSlice.reducer;
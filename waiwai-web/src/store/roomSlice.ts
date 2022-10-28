
import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { getDatabase, ref, push } from "firebase/database";
import { browserKey } from '../BrowserKey'

//　Stateの型定義
type State = {
 roomId: string               // 部屋ID
 adminUserKey:string          // 管理者のUserKety
 activeQuestionnaire:string   // 有効なアンケートID
}

//　初期値
const initialState:State = 
{
  roomId:"",
  adminUserKey:"",
  activeQuestionnaire:""
}

//　RealTimeDB上のRoomノードの構造定義
type db_Room = {
  title: string                // 部屋名
  adminUserKey:string          // 管理者のUserKety
  activeQuestionnaire:string   // 有効なアンケートID
 }

export const roomSlice = createSlice({
  name: 'roomId',
  initialState,
  reducers: {
    
    //　部屋を新規に作成
    createNew: (state:State) => {

      console.log("Call createNew")
      //DBにセットする値を作成
      const newRoom : db_Room = {
        title : "Titleを入力してください",    
        adminUserKey : browserKey, 
        activeQuestionnaire : ""
      }

      const db = getDatabase();
      const roomsRef = ref(db, 'rooms');
      const room = push(roomsRef, newRoom);
      //　部屋の作成に成功したら部屋キーを更新する
      if(typeof room.key === 'string')
      {
        state.roomId = room.key;
      }
    },

    //　既存の部屋に入室　
    setId: (state:State, actton:PayloadAction<string>) => {

      const roomid = actton.payload
      const db = getDatabase();
      const roomsRef = ref(db, 'rooms/' + roomid);

      if(roomsRef.isEqual(null))
      {
        console.log("エラー")
      }
      state.roomId = actton.payload;
    },
  },
});

// アクションの外部定義
export const { createNew, setId } = roomSlice.actions;
export default roomSlice.reducer;

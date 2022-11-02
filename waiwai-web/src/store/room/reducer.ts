
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, push, get, set, child } from "firebase/database";
import { browserKey } from '../../BrowserKey'


// Stateの型定義
export type RoomState = {
  id: string                   // 部屋ID
  title: string                // 部屋名
  adminUserKey: string          // 管理者のUserKety
  activeQuestionnaire: string   // 有効なアンケートID
}

// 初期値
const initialState: RoomState =
{
  id: "",
  title: "",
  adminUserKey: "",
  activeQuestionnaire: ""
}

// RealTimeDB上のRoomノードの構造定義
type db_Room = {
  title: string                // 部屋名
  adminUserKey: string          // 管理者のUserKety
  activeQuestionnaire: string   // 有効なアンケートID
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.id = action.payload;
    })

    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(CreateRoom.fulfilled, (state, action) => {
      state.title = action.payload.title;
      state.id = action.payload.id;
    })
  },
});

// First, create the thunk
export const CreateRoom = createAsyncThunk(
  'room/CreateRoom',
  async () => {

    console.log("Call createNew")
    //DBにセットする値を作成
    const newRoom: db_Room = {
      title: "Titleを入力してください",
      adminUserKey: browserKey,
      activeQuestionnaire: ""
    }

    const db = getDatabase();
    const roomsRef = ref(db, 'rooms');
    const room = push(roomsRef);

    await set(room, newRoom)

    let roomId = ""
    if (typeof (room.key) === 'string') {
      roomId = room.key
    }
    //戻り値
    const returnValue: RoomState =
    {
      id: roomId,
      ...newRoom
    }

    return returnValue
  }
)


// 非同期アクションの定義
export const getRoom = createAsyncThunk<string, string>(
  'room/get',
  async (roomId: string) => {
    const db = getDatabase();
    const roomsRef = ref(db, 'rooms');
    try {
      const snapshot = await get(child(roomsRef, roomId))
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return roomId;
      } else {
        console.log("No data available");
      }

    } catch (error) {
      console.error(error);
    }
    return "error"
  }
)

// アクションの外部定義
export default roomSlice.reducer;

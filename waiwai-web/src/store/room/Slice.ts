
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Room = {
  id: string                   // 部屋ID
  title: string                // 部屋名
  adminUserKey: string          // 管理者のUserKety
  activeQuestionnaire: string   // 有効なアンケートID
  stamp: StampItem[]
}
export type StampItem = {
  id: string
  comment: string
}

// Stateの型定義
export type RoomState = {
  state: {
    errorMessage: string
  }
  room: Room
}

// 初期値
const initialState: RoomState =
{
  state:
  {
    errorMessage: ''
  },
  room: {
    id: '',
    title: '',
    adminUserKey: '',
    activeQuestionnaire: '',
    stamp: []
  }
}

// RealTimeDB上のRoomノードの構造定義
export type db_Room = {
  title: string                // 部屋名
  adminUserKey: string          // 管理者のUserKety
  activeQuestionnaire: string   // 有効なアンケートID
  stamp: StampItem[]               // コメントスタンプ文字列
}

export const roomSlice = createSlice({
  name: 'room',
  initialState,

  reducers: {
    // 既存の部屋に入室
    setRoom: (state: RoomState, actton: PayloadAction<Room>) => {
      const room = actton.payload
      state.room = room
    },
    setRoomTitle: (state: RoomState, actton: PayloadAction<string>) => {
      state.room.title = actton.payload
    },
    setError: (state: RoomState, actton: PayloadAction<string>) => {
      console.log(`エラー発生 ${actton.payload}`)
      state.state.errorMessage = actton.payload
    }
  },
})

// アクションの外部定義
export const { setRoom, setError, setRoomTitle } = roomSlice.actions
export default roomSlice.reducer
/*
export const useRoomId = (): RoomId => {
  const roomid = useSelector((state) => state.room.room.id)
  return new RoomId(roomid)
}
*/
/*
extraReducers: (builder) => {
// Add reducers for additional action types here, and handle loading state as needed
builder.addCase(getRoom.fulfilled, (state, action) => {
state.id = action.payload
})
 
// Add reducers for additional action types here, and handle loading state as needed
builder.addCase(CreateRoom.fulfilled, (state, action) => {
state.title = action.payload.title
state.id = action.payload.id
state.adminUserKey = action.payload.adminUserKey
state.activeQuestionnaire = action.payload.activeQuestionnaire
})
},*/

/*
// 非同期アクションの定義
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

export const getRoom = createAsyncThunk<string, string>(
  'room/get',
  async (roomId: string) => {
    const db = getDatabase();
    try {
      const roomsRef = ref(db, 'rooms');
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
*/


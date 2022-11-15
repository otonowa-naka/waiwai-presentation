
import { getDatabase, ref, push, get, set, child, onValue } from 'firebase/database'
import { browserKey } from '../../BrowserKey'
import { AppDispatch } from '../'
import { db_Room, Room, setError, setRoom } from './Slice'

// 部屋IDを指定してRoomを開く
export function setRoomAction(roomId: string) {
    return async (dispatch: AppDispatch) => {
        try {
            if (roomId.length !== 20) {
                throw new RangeError('文字通が20文字ではありません。')
            }

            if (roomId.match(/^[!-~]{20}$/) == null) {
                throw new RangeError('アスキー文字以外が入力させました。')
            }

            const db = getDatabase()
            const roomRef = ref(db, 'rooms')

            const snapshot = await get(child(roomRef, roomId))
            if (snapshot.exists()) {
                console.log(snapshot.val())
            } else {
                throw new Error('指定の部屋IDは存在しません。')
            }

            const starCountRef = ref(db, `rooms/${roomId}`)
            onValue(starCountRef, (snapshot) => {
                const dbRoom = snapshot.val() as db_Room
                // 初期値
                const newRoom: Room =
                {
                    id: roomId,
                    ...dbRoom
                }
                dispatch(setRoom(newRoom))
            })
        } catch (err) {
            if (err instanceof Error) {
                dispatch(setError(err.message))
            } else {
                dispatch(setError('例外が発生しました'))
            }
        }
    }
}

// 新規で部屋を作成する
export function ActionCreateRoom() {
    return async (dispatch: AppDispatch) => {
        console.log('Call createNew')
        //DBにセットする値を作成
        const newRoom: db_Room = {
            title: 'Titleを入力してください',
            adminUserKey: browserKey,
            activeQuestionnaire: ''
        }

        const db = getDatabase()
        const roomsRef = ref(db, 'rooms')
        const room = push(roomsRef)

        await set(room, newRoom)

        let roomId = ''
        if (typeof (room.key) === 'string') {
            roomId = room.key
        }

        onValue(room, (snapshot) => {
            const dbRoom = snapshot.val() as db_Room
            // 初期値
            const newRoom: Room =
            {
                id: roomId,
                ...dbRoom
            }
            dispatch(setRoom(newRoom))
        })
    }
}
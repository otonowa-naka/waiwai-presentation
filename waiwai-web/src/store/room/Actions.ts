
import { getDatabase, ref, push, get, set, child, onValue, ThenableReference, Query } from 'firebase/database'
import { browserKey } from '../../BrowserKey'
import { AppDispatch } from '../'
import { db_Room, Room, setError, setRoom, StampItem } from './Slice'
import { RoomId } from './'
import { v4 as uuidv4 } from 'uuid'

// 部屋IDを指定してRoomを開く
export function setRoomAction(roomId: RoomId) {
    return async (dispatch: AppDispatch) => {
        try {
            const db = getDatabase()
            const roomRef = ref(db, 'rooms')

            const snapshot = await get(child(roomRef, roomId.Id()))
            if (snapshot.exists()) {
                console.log(snapshot.val())
            } else {
                throw new Error('指定の部屋IDは存在しません。')
            }

            const starCountRef = ref(db, `rooms/${roomId.Id()}`)
            ListenRoomChangeEvent(dispatch, starCountRef, roomId.Id())
        } catch (err) {
            if (err instanceof Error) {
                dispatch(setError(err.message))
            } else {
                dispatch(setError('例外が発生しました'))
            }
        }
    }
}

function CreateStamp(comment: string): StampItem {
    return {
        id: uuidv4(),
        comment: comment
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
            activeQuestionnaire: '',
            stamp: [CreateStamp('いいね'), CreateStamp('なるほど'), CreateStamp('88888')]
        }

        const db = getDatabase()
        const roomsRef = ref(db, 'rooms')
        const room = push(roomsRef)

        await set(room, newRoom)

        let roomId = ''
        if (typeof (room.key) === 'string') {
            roomId = room.key
        }
        ListenRoomChangeEvent(dispatch, room, roomId)

    }
}

function ListenRoomChangeEvent(dispatch: AppDispatch, room: Query, roomId: string) {
    onValue(room, (snapshot) => {
        const dbRoom = snapshot.val() as db_Room

        // 初期値
        const newRoom: Room =
        {
            id: roomId,
            ...dbRoom
        }
        if (newRoom.stamp === undefined) {
            newRoom.stamp = []
        }

        dispatch(setRoom(newRoom))
    })
}

// スタンプの全要素を新しい一覧に更新する
export function ActionUpdateStamp(roomId: RoomId, stamps: StampItem[]) {
    return async (dispatch: AppDispatch) => {
        const db = getDatabase()
        const starCountRef = ref(db, `rooms/${roomId.Id()}/stamp`)
        await set(starCountRef, stamps)
    }
}

export function ActionUpdateTitle(roomId: RoomId, title: string) {
    return async (dispatch: AppDispatch) => {
        const db = getDatabase()
        const starCountRef = ref(db, `rooms/${roomId.Id()}/title`)
        await set(starCountRef, title)
    }
}
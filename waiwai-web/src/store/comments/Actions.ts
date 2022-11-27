import { getDatabase, ref, push, set, onChildAdded, DataSnapshot, Unsubscribe } from 'firebase/database'
import { AppDispatch } from '..'
import { RoomId } from '../room/RoomId'
import { CommentItem, commentsSlice, setError } from './Slice'

let onChildAddedUnscribe: Unsubscribe = () => void {}

// 部屋IDで指定
export function OpenCommentsAction(roomId: RoomId) {
    return (dispatch: AppDispatch) => {
        try {

            // 前回のListener監視を解除
            onChildAddedUnscribe()
            dispatch(commentsSlice.actions.ClearComments())

            if (roomId.IsEmpty()) {
                return
            }
            const db = getDatabase()
            const starCountRef = ref(db, `commentRooms/${roomId.Id()}`)

            onChildAddedUnscribe = onChildAdded(starCountRef, (data: DataSnapshot) => {
                const item = data.val() as CommentItem
                dispatch(commentsSlice.actions.AddComment(item))
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
// 部屋IDで指定
export function PushCommentAction(roomId: RoomId, commnet: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const db = getDatabase()
            const postListRef = ref(db, `commentRooms/${roomId.Id()}`)
            const newPostRef = push(postListRef)
            const db_item: CommentItem = {
                comment: commnet
            }

            await set(newPostRef, db_item)
            // DBの変更通知で更新するので正常系ではDispatchしない
        } catch (err) {
            if (err instanceof Error) {
                dispatch(setError(err.message))
            } else {
                dispatch(setError('例外が発生しました'))
            }
        }
    }
}
/*
// 部屋IDで指定
export function PushCommentAction2(commnet: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const roomId = store.getState().roomState.room.id

            const db = getDatabase()
            const postListRef = ref(db, `commentRooms/${roomId}`)
            const newPostRef = push(postListRef)
            const db_item: CommentItem = {
                comment: commnet
            }

            await set(newPostRef, db_item)
            // DBの変更通知で更新するので正常系ではDispatchしない
        } catch (err) {
            if (err instanceof Error) {
                dispatch(setError(err.message))
            } else {
                dispatch(setError('例外が発生しました'))
            }
        }
    }
}
*/
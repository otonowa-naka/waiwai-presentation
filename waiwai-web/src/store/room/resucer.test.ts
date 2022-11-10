

import { describe, expect, test } from '@jest/globals'

import { ActionCreateRoom, setRoomAction } from './reducer'
import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator, ref, set } from 'firebase/database'
import { firebaseConfig } from '../../firebaseConfig'
import { browserKey } from '../../BrowserKey'
import { store } from '../'
import { Unsubscribe } from '@reduxjs/toolkit'

// テストではローカルのDBを利用するための環境変数設定
beforeAll(() => {
    initializeApp(firebaseConfig)
    const firebaseDb = getDatabase()

    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
})

describe('roomSlice', () => {
    /*
    test('CreateRoomが正常に完了した場合は、TitleとIDがセットされている', () => {
        const action = {
            type: CreateRoom.fulfilled.type,
            payload: {
                title: "テスト",
                id: "iddayo"
            }
        }
        const state = roomSlice.reducer(undefined, action)
        expect(state.title).toEqual("テスト")
        expect(state.id).toEqual("iddayo")
    })
    */

    // ストアの評価にサブスクライブを利用した時の初期化処理のために必要
    let unscribe: Unsubscribe = () => {/* do nothing.*/ }

    beforeEach(async () => {
        const firebaseDb = getDatabase()
        await set(ref(firebaseDb), null)
        unscribe = () => {/* do nothing.*/ }
    })

    afterEach(() => {
        unscribe()
    })

    test('CreateRoomアクションを実行すると新規Roomを作成する', (done) => {

        unscribe = store.subscribe(() => {
            expect(store.getState().room.room.title).toEqual('Titleを入力してください')
            expect(store.getState().room.room.adminUserKey).toEqual(browserKey)
            expect(store.getState().room.room.activeQuestionnaire).toEqual('')
            done()
        })

        store.dispatch(ActionCreateRoom())
            .catch((error) => { throw error })
    })

    describe('setRoomAction', () => {
        test('既存のRoomを開く', (done) => {
            const roomid = '-NFxULh4uJJZO4WnYMl4'
            const db = getDatabase()
            set(ref(db, `rooms/${roomid}`), {
                title: 'テストタイトル',
                adminUserKey: browserKey,
                activeQuestionnaire: 'テスト質問'
            })
                .catch((error) => { throw error })

            unscribe = store.subscribe(() => {
                expect(store.getState().room.room.title).toEqual('テストタイトル')
                expect(store.getState().room.room.adminUserKey).toEqual(browserKey)
                expect(store.getState().room.room.activeQuestionnaire).toEqual('テスト質問')
                done()
            })
            store.dispatch(setRoomAction(roomid))
                .catch((error) => { throw error })
        })

        test('存在しないRoomを開くと例外をスローする', (done) => {
            const roomid = '-NFxULh4uJJZO4WnYMl4'

            // ルームをセットしないのでRoomは存在しない
            unscribe = store.subscribe(() => {
                expect(store.getState().room.state.errorMessage).toEqual('指定の部屋IDは存在しません。')
                done()
            })

            store.dispatch(setRoomAction(roomid))
                .catch((error) => { throw error })
        })
    })
})
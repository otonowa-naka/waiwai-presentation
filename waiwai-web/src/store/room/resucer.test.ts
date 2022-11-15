/* eslint-disable @typescript-eslint/no-unsafe-call */


import { describe, expect, test } from '@jest/globals'

import { ActionCreateRoom, Room, RoomState, setRoomAction } from './reducer'
import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator, ref, set } from 'firebase/database'
import { firebaseConfig } from '../../firebaseConfig'
import { browserKey } from '../../BrowserKey'
import { AppDispatch, store } from '../'
import { Unsubscribe } from '@reduxjs/toolkit'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

// テストではローカルのDBを利用するための環境変数設定
beforeAll(() => {
    initializeApp(firebaseConfig)
    const firebaseDb = getDatabase()

    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
})

describe('roomSlice', () => {



    test('CreateRoomアクションを実行すると新規Roomを作成するMock版', async () => {

        const initialState: RoomState =
        {
            state:
            {
                running: false,
                errorMessage: ''
            },
            room: {
                id: '',
                title: '',
                adminUserKey: '',
                activeQuestionnaire: ''
            }
        }

        const mockStore = configureMockStore<RoomState, AppDispatch>([thunk])
        const store2 = mockStore(initialState)

        await store2.dispatch(ActionCreateRoom())

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const romm = store2.getActions()[0].payload as Room

        expect(romm.title).toEqual('Titleを入力してください')
        /*
        expect(act).toEqual({
            payload: {
                message: 'mocked',
            },
            type: 'FETCH_ADVICE',
        })*/

    })

    // ストアの評価にサブスクライブを利用した時の初期化処理のために必要
    let unscribe: Unsubscribe = () => {/* do nothing.*/ }

    beforeEach(async () => {
        const firebaseDb = getDatabase()
        await set(ref(firebaseDb), null)

        //        await set(ref(firebaseDb, 'rooms'), null)
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
                .then(() => { console.log('aaaa') })
                .catch((error) => { throw error })
        })
    })
})
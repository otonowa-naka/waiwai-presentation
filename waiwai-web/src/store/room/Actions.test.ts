/* eslint-disable jest/no-conditional-expect */
import { describe, expect, test } from '@jest/globals'
import { PayloadAction, Unsubscribe } from '@reduxjs/toolkit'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator, ref, set } from 'firebase/database'

import { AppDispatch } from '..'
import { firebaseConfig } from '../../firebaseConfig'
import { browserKey } from '../../BrowserKey'
import { Room, RoomState } from './Slice'
import { ActionCreateRoom, setRoomAction } from './Actions'

// テストではローカルのDBを利用するための環境変数設定
beforeAll(() => {
    initializeApp(firebaseConfig)
    const firebaseDb = getDatabase()

    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
})

const mockStoreCreater = configureMockStore<RoomState, AppDispatch>([thunk])
// 初期ステート
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

describe('roomSlice', () => {
    // ストアの評価にサブスクライブを利用した時の初期化処理のために必要
    let unscribe: Unsubscribe = () => {/* do nothing.*/ }

    beforeEach(async () => {
        const firebaseDb = getDatabase()
        await set(ref(firebaseDb, 'rooms'), null)
        unscribe = () => {/* do nothing.*/ }
    })

    afterEach(() => {
        unscribe()
    })

    describe('CreateRoom', () => {
        test('CreateRoomアクションを実行すると新規Roomを作成する', (done) => {
            const asyncTest = async () => {
                const mockStore = mockStoreCreater(initialState)
                mockStore.subscribe(() => {
                    const act = mockStore.getActions()[0] as PayloadAction<Room>
                    expect(act.payload.id.length).toEqual(20)
                    expect(act.payload.activeQuestionnaire.length).toEqual(0)
                    expect(act.payload.adminUserKey).toEqual(browserKey)
                    expect(act.payload.title).toEqual('Titleを入力してください')
                    done()
                })
                await mockStore.dispatch(ActionCreateRoom())
            }

            asyncTest()
                .catch((error) => { throw error })
        })
    })
    describe('setRoomAction', () => {
        test('既存のRoomが存在した場合はsetRoomActionにRoom情報をセットする', (done) => {
            const asyncTest = async () => {
                // テスト準備-事前にDBにテスト用の部屋を作成
                const roomid = '-NFxULh4uJJZO4WnYMl4'
                const db = getDatabase()
                await set(ref(db, `rooms/${roomid}`), {
                    title: 'テストタイトル',
                    adminUserKey: 'Test ID',
                    activeQuestionnaire: 'テスト質問'
                })
                const mockStore = mockStoreCreater(initialState)
                mockStore.subscribe(() => {
                    const act = mockStore.getActions()[0] as PayloadAction<Room>
                    expect(act.payload.title).toEqual('テストタイトル')
                    expect(act.payload.adminUserKey).toEqual('Test ID')
                    expect(act.payload.activeQuestionnaire).toEqual('テスト質問')
                    done()
                })
                await mockStore.dispatch(setRoomAction(roomid))
            }

            asyncTest()
                .catch((error) => { throw error })

        })

        test('存在しないRoomを開くとsetErrorにエラーメッセージをセットする', (done) => {
            const asyncTest = async () => {
                // テスト準備-事前にDBにテスト用の部屋を作成
                const roomid = '-NFxULh4uJJZO4WnYMl4'

                const mockStore = mockStoreCreater(initialState)
                mockStore.subscribe(() => {
                    // ルームをセットしないのでRoomは存在しない
                    const act = mockStore.getActions()[0] as PayloadAction<string>
                    expect(act.payload).toEqual('指定の部屋IDは存在しません。')
                    done()
                })
                await mockStore.dispatch(setRoomAction(roomid))
            }

            asyncTest()
                .catch((error) => { throw error })
        })
    })
})
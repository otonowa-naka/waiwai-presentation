

import { describe, expect, test } from '@jest/globals'

import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator, ref, set } from 'firebase/database'
import { firebaseConfig } from '../../firebaseConfig'
import { store } from '../'
import { Unsubscribe } from '@reduxjs/toolkit'
import { OpenCommentsAction, PushCommentAction, PushCommentAction2 } from './Operation'
import { ActionCreateRoom } from '../room/reducer'

// テストではローカルのDBを利用するための環境変数設定
beforeAll(() => {
    initializeApp(firebaseConfig)
    const firebaseDb = getDatabase()

    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
})

describe('commentsSlice', () => {

    // ストアの評価にサブスクライブを利用した時の初期化処理のために必要
    let unscribe: Unsubscribe = () => {/* do nothing.*/ }

    beforeEach(async () => {
        const firebaseDb = getDatabase()
        await set(ref(firebaseDb, 'commentRooms'), null)
        unscribe = () => {/* do nothing.*/ }
    })


    afterEach(() => {
        unscribe()
    })
    test('setRoomActionアクションを実行すると新規Room監視する', (done) => {
        /*
                unscribe = store.subscribe(() => {
                    const commentsState = store.getState().commentsState
        
                    //expect(commentsState.content.roomId).toEqual('0'.repeat(20))
                    expect(commentsState.content.comments.length).toEqual(0)
                    done()
                })
                */
        store.dispatch(OpenCommentsAction('0'.repeat(20)))
        done()
    })
    test('PushCommentActionアクションを実行するとコメントが登録される', (done) => {

        store.dispatch(OpenCommentsAction('0'.repeat(20)))
        unscribe = store.subscribe(() => {
            const commentsState = store.getState().commentsState

            //expect(commentsState.content.roomId).toEqual('0'.repeat(20))
            expect(commentsState.content.comments[0].comment).toEqual('最初のコメント')
            //unscribe() // チェンジイベント2回飛んでくるのでサブスクライブを解除
            done()
        })
        store.dispatch(PushCommentAction('0'.repeat(20), '最初のコメント'))
            .catch((error) => { throw error })
    })

    test('PushCommentActionアクションを実行するとコメントが登録される22', (done) => {

        try {
            store.dispatch(ActionCreateRoom())
                .then(() => {
                    store.dispatch(OpenCommentsAction(store.getState().room.room.id))
                    unscribe = store.subscribe(() => {
                        try {
                            const commentsState = store.getState().commentsState
                            // eslint-disable-next-line jest/no-conditional-expect
                            expect(commentsState.content.comments[0].comment).toEqual('最初のコメント')
                            done()
                        } catch {
                            done(new Error(''))
                        }
                    })
                    store.dispatch(PushCommentAction2('最初のコメント'))
                        .catch((error) => { done(new Error('')) })
                })
                .catch((err) => { done(new Error('')) })
        } catch
        {
            done(new Error(''))
        }
    })
})
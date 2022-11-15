/* eslint-disable jest/no-conditional-expect */


import { describe, expect, test } from '@jest/globals'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { initializeApp } from 'firebase/app'
import { getDatabase, connectDatabaseEmulator, ref, set } from 'firebase/database'
import { firebaseConfig } from '../../firebaseConfig'
import { AppDispatch, store } from '..'
import { PayloadAction, Unsubscribe } from '@reduxjs/toolkit'
import { OpenCommentsAction, PushCommentAction } from './Actions'
import { CommentItem, CommentsState } from './Slice'


const mockStoreCreater = configureMockStore<CommentsState, AppDispatch>([thunk])

const initialState: CommentsState =
{
    state:
    {
        running: false,
        errorMessage: ''
    },
    content:
    {
        comments: []
    }
}

// テストではローカルのDBを利用するための環境変数設定
beforeAll(() => {
    initializeApp(firebaseConfig)
    const firebaseDb = getDatabase()

    connectDatabaseEmulator(firebaseDb, 'localhost', 9000)
})
describe('CommentsActions', () => {
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

    describe('OpenCommentsAction_PushCommentAction', () => {
        test('PushCommentActionアクションを実行するとコメントが登録される', (done) => {
            const mockStore = mockStoreCreater(initialState)

            mockStore.subscribe(() => {
                if (mockStore.getActions().length > 1) {
                    const act = mockStore.getActions()[1] as PayloadAction<CommentItem>
                    expect(act.payload.comment).toEqual('最初のコメント')
                    done()
                }
            })
            mockStore.dispatch(OpenCommentsAction('0'.repeat(20)))
            mockStore.dispatch(PushCommentAction('0'.repeat(20), '最初のコメント'))
                .catch((error) => { throw error })
        })

        /*
        test('PushCommentActionアクションを実行するとコメントが登録される22', (done) => {

            try {
                store.dispatch(ActionCreateRoom())
                    .then(() => {
                        store.dispatch(OpenCommentsAction(store.getState().roomState.room.id))
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
        */
    })
})
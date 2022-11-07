

import { describe, expect, test } from '@jest/globals';

import roomIdReducer from './reducer';
import { roomSlice, CreateRoom, RoomState } from './reducer';
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { firebaseConfig } from '../../firebaseConfig'
import { PayloadAction, configureStore } from '@reduxjs/toolkit';

// テストではローカルのDBを利用するための環境変数設定
process.env.FIREBASE_DATABASE_EMULATOR_HOST = 'localhost:9000';

describe('roomSlice', () => {
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

    /*
        test('呼び出したときpenndingのみを返す', async () => {
            const firebaseApp = initializeApp(firebaseConfig)
            const firebaseDb = getDatabase();
    
            // Point to the RTDB emulator running on localhost.
            connectDatabaseEmulator(firebaseDb, "localhost", 9000);
    
            const result = await store.dispatch<Promise<PayloadAction<RoomState>>>( CreateRoom())
            expect(result.payload.title).toEqual('Titleを入力してください')
        });
    */
    test('呼び出したときpenndingのみを返す2', async () => {
        const firebaseApp = initializeApp(firebaseConfig)
        const firebaseDb = getDatabase();

        // Point to the RTDB emulator running on localhost.
        // connectDatabaseEmulator(firebaseDb, "localhost", 9000);

        const store2 = configureStore({
            reducer: {
                // Sliceを追加した場合は、ここに追加していく
                room: roomIdReducer
            },
        });

        await store2.dispatch(CreateRoom())
        expect(store2.getState().room.title).toEqual('Titleを入力してください')
    });
})
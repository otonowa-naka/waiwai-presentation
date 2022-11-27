import { render, screen } from '@testing-library/react'
import { RoomEntry } from './RoomEntry'
import { configureStore } from '@reduxjs/toolkit'
import roomIdReducer from '../../../store/room/Slice'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'


describe('バリテーション', () => {
    const store = configureStore({
        reducer:
        {
            room: roomIdReducer
        }
    })

    const setup = () => {
        render(
            <Provider store={store}>
                <RoomEntry />
            </Provider>)
    }

    describe('RoomIDが空の状態', () => {
        test('バリテーションが消えること', () => {
            setup()
            expect(screen.getByRole('textbox')).not.toHaveClass('is-invalid')
        })
        test('入室ボタンは押せないこと', () => {
            setup()
            expect(screen.getByTestId('roomEnter')).toBeDisabled()
        })

    })

    describe('RoomIdに21文字入力した場合', () => {
        test('バリテーションエラーになること', () => {
            setup()
            userEvent.type(screen.getByRole('textbox'), '0'.repeat(21))
            expect(screen.getByRole('textbox')).toHaveClass('is-invalid')
        })

        test('入室ボタンは押せないこと', () => {
            setup()
            userEvent.type(screen.getByRole('textbox'), '0'.repeat(21))
            expect(screen.getByTestId('roomEnter')).toBeDisabled()
        })

    })

    describe('RoomIdに20文字入力した場合', () => {
        test('バリテーションが消えること', () => {
            setup()
            userEvent.type(screen.getByRole('textbox'), '0'.repeat(20))
            expect(screen.getByRole('textbox')).not.toHaveClass('is-invalid')
        })

        test('入室ボタンは押せること', () => {
            setup()
            userEvent.type(screen.getByRole('textbox'), '0'.repeat(20))
            expect(screen.getByTestId('roomEnter')).not.toBeDisabled()
        })
    })
})
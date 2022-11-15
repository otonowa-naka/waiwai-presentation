import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'
import { configureStore } from '@reduxjs/toolkit'
import roomIdReducer from '../store/room/Slice'
import { Provider } from 'react-redux'

test('renders learn react link', () => {
  const store = configureStore({
    reducer:
    {
      roomState: roomIdReducer
    }
  })

  render(
    <Provider store={store}>
      <App />
    </Provider>)

  const linkElement = screen.getByText('部屋IDをご存じの場合は、部屋IDを入力して入室を押してください。')
  expect(linkElement).toBeInTheDocument()
})

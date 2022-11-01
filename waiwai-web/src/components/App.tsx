import { FC } from "react"
import { RootLayout } from "./Layout/Root/RootLayout"
import { RoomLayout } from "./Layout/Room/RoomLayout"

import { useSelector } from '../store'
import { RoomId } from "../store/RoomId"

export const App: FC = () => {
  const roomID_redux = useSelector((state) => state.room.id)

  return (
    <div>
      <h1>ワイワイプレゼンテーション</h1>
      {
        roomID_redux.IsEmpty() ? <RootLayout /> : <RoomLayout />
      }
    </div>
  )
}


import { FC, useEffect } from 'react'
import { RootLayout } from './Layout/Root/RootLayout'
import { RoomLayout } from './Layout/Room/RoomLayout'

import { useRoomId } from '../store/room/Hooks'
import { OpenCommentsAction } from '../store/comments/Actions'
import { useAppDispatch } from '../store'

export const App: FC = () => {
  const roomId = useRoomId()
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('エフェクト作動')
    dispatch(OpenCommentsAction(roomId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  return (
    <div>
      <h1>ワイワイプレゼンテーション</h1>
      {
        roomId.IsEmpty() ? <RootLayout /> : <RoomLayout roomId={roomId} />
      }
    </div>
  )
}


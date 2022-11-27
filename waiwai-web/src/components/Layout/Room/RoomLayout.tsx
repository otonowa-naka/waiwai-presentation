import { FC } from 'react'
import { CommentList } from '../../Elements/CommentList'
import { CommentPush } from '../../Elements/CommentPush'
import { RoomId, useRoomTitle } from '../../../store/room'
import { Stamp } from '../../Elements/stamp'
import { RoomConfig } from '../../Elements/RoomConfig/RoomConfig'

type Porps =
  {
    roomId: RoomId
  }
export const RoomLayout: FC<Porps> = (porps) => {
  const { roomId } = porps

  const title = useRoomTitle()
  return (
    <div>
      <h1>{title}</h1>
      <RoomConfig roomId={roomId} ></RoomConfig>
      <CommentPush roomId={roomId} />
      <Stamp roomId={roomId} />
      <CommentList></CommentList>
    </div >
  )
}
import { FC } from 'react'
import { CommentList } from '../../Elements/CommentList'
import { CommentPush } from '../../Elements/CommentPush'
import { useSelector } from '../../../store'
import { RoomId } from '../../../store/room/RoomId'

type Porps =
  {
    roomId: RoomId
  }
export const RoomLayout: FC<Porps> = (porps) => {
  const { roomId } = porps

  const title = useSelector((state) => state.roomState.room.title)
  return (
    <div>
      <h1>{title}</h1>
      <CommentPush roomId={roomId}></CommentPush>
      <CommentList></CommentList>
    </div >
  )
}
import { FC } from 'react'
import { CommentList } from '../../Elements/CommentList'
import { useComments } from '../../../hooks/useComments'
import { CommentPush } from '../../Elements/CommentPush'
import { useSelector } from '../../../store'


export const RoomLayout: FC = () => {
  // コメント一覧
  const { comments, PushComment } = useComments()

  const title = useSelector((state) => state.room.room.title)

  return (
    <div>
      <h1>{title}</h1>
      <CommentPush PushComment={PushComment}></CommentPush>
      <CommentList comments={comments}></CommentList>
    </div>
  )
}
import { FC } from "react"
import { CommentList } from "../../Elements/CommentList"
import { useComments } from "../../../hooks/useComments"
import { CommentPush } from "../../Elements/CommentPush"

export const RoomLayout:FC = ()=>
{
  // コメント一覧
  const {comments, PushComment} = useComments()

  return(
    <div>
      <h1>簡単メモアプリ</h1>
      <CommentPush PushComment={PushComment}></CommentPush>
      <CommentPush PushComment={PushComment}></CommentPush>
      <CommentList comments={comments}></CommentList>
    </div>
  )
}
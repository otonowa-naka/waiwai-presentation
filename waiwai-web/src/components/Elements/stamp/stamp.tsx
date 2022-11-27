import { FC } from 'react'

import Button from 'react-bootstrap/Button'
import { Stack } from 'react-bootstrap'
import { useAppDispatch } from '../../../store'
import { PushCommentAction } from '../../../store/comments'
import { RoomId, useStamp } from '../../../store/room'

type Porps =
    {
        roomId: RoomId
    }

export const Stamp: FC<Porps> = (propos) => {
    const { roomId } = propos
    const stampList = useStamp()

    // テキストボックス入力時に入力内容をStateに保存
    const dispatch = useAppDispatch()

    return (
        <Stack direction='horizontal' gap={3}>
            {stampList.map((item) => (
                <Button key={item.id} variant='outline-primary' onClick={async () => { await dispatch(PushCommentAction(roomId, item.comment)) }}>{item.comment}</Button>
            ))}
        </Stack >)
}
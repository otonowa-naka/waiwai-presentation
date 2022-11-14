import { FC } from 'react'
import { useAppDispatch, useSelector } from '../../../store'
import { ActionCreateRoom } from '../../../store/room/reducer'
import { RoomEntry } from '../../Elements/RoomEntry/RoomEntry'

import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

export const RootLayout: FC = () => {
  // bootstrapのStylesheetの読み込み
  //イベント定義
  const dispatch = useAppDispatch()
  const OnClick = async () => {
    await dispatch(ActionCreateRoom())
  }

  const errorMessage = useSelector((state) => state.room.state.errorMessage)

  return (
    <div>
      <p>ようこそ</p>
      <p>新たに部屋を作成する場合は、新規作成をクリックしてください。</p>
      <Button variant="outline-primary" onClick={OnClick}>新規作成</Button>
      <p>部屋IDをご存じの場合は、部屋IDを入力して入室を押してください。</p>
      <RoomEntry />
      {
        errorMessage !== '' && <Alert variant='warning'> {errorMessage}</Alert>
      }
    </div>
  )
}
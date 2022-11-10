import { FC, useState, ChangeEvent } from 'react'
import { useAppDispatch } from '../../../store'
import { setRoomAction } from '../../../store/room/reducer'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'


export const RoomEntry: FC = () => {
  // bootstrapのStylesheetの読み込み
  //イベント定義
  const dispatch = useAppDispatch()

  const OnEntryClick = async () => {
    await dispatch(setRoomAction(roomId))
  }

  // 送信コメント State
  const [roomId, setRoomId] = useState<string>('')
  const [roomIdInvalid, setRoomIdInvalid] = useState(true)

  return (
    <div>
      <InputGroup hasValidation>
        <Form.Label>部屋番号</Form.Label>
        <Form.Control
          type="roomId"
          value={roomId}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setRoomIdInvalid(e.target.value.match(/^[!-~]{20}$/) === null)
            setRoomId(e.target.value)
          }}
          placeholder="部屋番号を入力してください"
          isInvalid={roomIdInvalid && roomId.length !== 0}
        />
        <Form.Control.Feedback type="invalid" data-testid="roomIdInvaildMessage">
          部屋番号の書式が間違っています。
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          例:-aas1a32s13ad5a1df
        </Form.Text>
      </InputGroup>
      <Button data-testid="roomEnter" variant="outline-primary" onClick={OnEntryClick} disabled={roomIdInvalid} >
        入室
      </Button>
    </div>
  )
}
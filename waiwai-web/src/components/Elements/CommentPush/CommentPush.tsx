import { FC, useState, ChangeEvent } from 'react'
import { useAppDispatch } from '../../../store'
import { PushCommentAction } from '../../../store/comments/Actions'
import { RoomId } from '../../../store/room/RoomId'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// コメント送信コンポート

type Porps =
    {
        roomId: RoomId
    }


export const CommentPush: FC<Porps> = (props) => {
    const { roomId } = props

    // 送信コメント State
    const [text, setText] = useState<string>('')
    // コメントバリテーション
    const [commentInvalid, setcommentInvalid] = useState(false)

    // テキストボックス入力時に入力内容をStateに保存
    const dispatch = useAppDispatch()

    // 送信ボタンクリック
    const OnClickAdd = async () => {
        await dispatch(PushCommentAction(roomId, text))
        setText('')
    }


    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter') {
            return
        }
        await OnClickAdd()
    }

    return (
        <Form.Group className="mb-3">
            <Container fluid={true}>
                <Row>
                    <Col >
                        <Form.Control
                            type="roomId"
                            value={text}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setcommentInvalid(e.target.value.length > 100)
                                setText(e.target.value)
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="コメントを入力して送信ボタンをおしてください"
                            isInvalid={commentInvalid}
                        />
                        <Form.Control.Feedback type="invalid" data-testid="roomIdInvaildMessage">
                            コメントは100100文字以下にしてください。
                        </Form.Control.Feedback>
                    </Col>
                    <Col md="1">
                        <Button onClick={OnClickAdd}>送信</Button>
                    </Col>
                </Row>
            </Container>
        </Form.Group >
    )
}
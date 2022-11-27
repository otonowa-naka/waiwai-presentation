import { ChangeEvent, FC, useState } from 'react'

import { useAppDispatch } from '../../../store'
import { ActionUpdateStamp, RoomId, ActionUpdateTitle, useRoomTitle, useStamp } from '../../../store/room'
import { Form, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'

type Porps =
    {
        roomId: RoomId
    }


export const RoomConfig: FC<Porps> = (props) => {
    const { roomId } = props
    const roomTitle = useRoomTitle()
    const [titleInvalid, setTitleInvalid] = useState(false)
    const [titleText, setTitleText] = useState(roomTitle)

    const stampList = useStamp()

    // テキストボックス入力時に入力内容をStateに保存
    const dispatch = useAppDispatch()
    const OnClickAdd = async () => {
        await dispatch(ActionUpdateTitle(roomId, titleText))
    }

    return (
        <Form.Group className="mb-3">
            <Container fluid={true}>
                <Row>
                    <Col>
                        <Form.Control
                            type="roomTitle"
                            value={titleText}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setTitleInvalid(e.target.value.length > 20)
                                setTitleText(e.target.value)
                            }}
                            placeholder="タイトルを入力してください"
                            isInvalid={titleInvalid}
                        />
                        <Form.Control.Feedback type="invalid" data-testid="roomIdInvaildMessage">
                            タイトルは２０文字以内にしてください
                        </Form.Control.Feedback>
                    </Col>
                    <Col md="1">
                        <Button onClick={OnClickAdd}>更新</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant='outline-primary'>スタンプ追加</Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <ListGroup>
                            {stampList.map((item) => (
                                <ListGroup.Item key={item.id}>
                                    <Button variant='outline-primary' onClick={async () => {
                                        await dispatch(
                                            ActionUpdateStamp(roomId, stampList.filter(
                                                (x) => { return x.id !== item.id }
                                            )
                                            ))
                                    }}>削除</Button>
                                    <Button variant='outline-primary'>更新</Button>
                                    <Button variant='outline-primary'>{item.comment}</Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </Form.Group>)
}
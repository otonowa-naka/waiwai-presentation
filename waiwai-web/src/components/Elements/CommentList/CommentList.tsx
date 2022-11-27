import { FC } from 'react'
import { useSelector } from '../../../store'
import ListGroup from 'react-bootstrap/ListGroup'

export const CommentList: FC = (propos) => {
    const commentList = useSelector((state) => state.commentsState.content.comments)

    return (
        <ListGroup variant="flush">
            {commentList.map((item, index) => (
                <ListGroup.Item key={item.comment}>
                    {item.comment}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
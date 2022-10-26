import {FC} from 'react'
import styled from 'styled-components'

// コメント一覧表示コンポーネント
type Props = 
{
    comments:string[]   // コメント一覧
}

export const CommentList:FC<Props> = (propos)=>
{
    const {comments} = propos

    return (
        <SContainer>
        <p>コメント一覧</p>
        <ul>
        {comments.map( (comment, index) => (
            <li key={comment}>
            <SMemoWrapper>
                <p>{comment}</p>
            </SMemoWrapper>
            </li>
        ))}
        </ul>
        </SContainer>
    )
}

const SContainer = styled.div`
border: solid 1px # ccc;
padding: 16px;
margin: 8px;
`
const SMemoWrapper = styled.div`
display: flex;
align-items: center;
`
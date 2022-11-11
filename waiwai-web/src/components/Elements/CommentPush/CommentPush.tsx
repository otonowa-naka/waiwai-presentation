import { FC, useState, ChangeEvent } from 'react'
import { SButton } from '../SButton'

// コメント送信コンポート

type Porps =
    {
        PushComment: (comment: string) => void  //コメント送信関数
    }


export const CommentPush: FC<Porps> = (props) => {
    const { PushComment } = props

    // 送信コメント State
    const [text, setText] = useState<string>('')

    // テキストボックス入力時に入力内容をStateに保存
    const OnChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    // 送信ボタンクリック
    const OnClickAdd = () => {
        PushComment(text)
        setText('')
    }

    return (
        <div>
            <input type="text" value={text} onChange={OnChangeText}></input>
            <SButton onClick={OnClickAdd}>送信</SButton>
        </div>)
}
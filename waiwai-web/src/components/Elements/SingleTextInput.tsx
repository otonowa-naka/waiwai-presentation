import { FC, useState, ChangeEvent } from 'react'
import { SButton } from './SButton'

// コメント送信コンポート

type Porps =
    {
        title: string
        SetText: (comment: string) => void;  //テキスト保存関数
        children?: React.ReactNode;
    }


export const SingleTextInput: FC<Porps> = (props) => {
    const { title, SetText, children } = props

    // 送信コメント State
    const [text, setText] = useState<string>("")

    // テキストボックス入力時に入力内容をStateに保存
    const OnChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    // 送信ボタンクリック
    const OnClickAdd = () => {
        SetText(text)
        setText("")
    }

    return (
        <div>
            <label>{title}</label>
            <input type="text" value={text} onChange={OnChangeText}></input>
            <SButton onClick={OnClickAdd}>{children}</SButton>
        </div>)
}
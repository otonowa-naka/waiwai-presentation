import {FC, useState, ChangeEvent} from "react"
import styled from "styled-components"

export const App:FC = ()=>
{
  // テキストボックス　State
  const [text, setText] = useState<string>("")

  const [memos, setMemos] = useState<string[]>([])

  // テキストボックス入力時に入力内容をStateに保存
  const OnChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  
  //　追加ボタンの
  const　OnClickAdd = ()=>{
    // State 変更を正に検知させる為に新たな配列を生成
    const newMemos = [...memos]

    newMemos.push(text)

    setMemos(newMemos)

    setText("")
  }

  const onClickDelete = (index: number) =>{
    const newMemos = [...memos]

    newMemos.splice(index, 1)
    setMemos(newMemos)
  }

  return(
    <div>
      <h1>簡単メモアプリ</h1>
      <input type="text" value={text} onChange={OnChangeText}></input>
      <SButton onClick={OnClickAdd}>追加</SButton>
      <SContainer>
        <p>メモ一覧</p>
        <ul>
          {memos.map( (memo, index) => (
            <li key={memo}>
              <SMemoWrapper>
                <p>{memo}</p>
                <SButton onClick={()=>onClickDelete(index)}>削除</SButton>
              </SMemoWrapper>
            </li>
          ))}
        </ul>
      </SContainer>
    </div>

  )
}

const SButton = styled.button`
  margin-left:1.6px
`
const SContainer = styled.div`
  border: solid 1px # ccc;
  padding: 16px;
  margin: 8px;
`
const SMemoWrapper = styled.div`
  display: flex;
  align-items: center;
`

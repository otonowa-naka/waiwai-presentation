import { FC } from "react"
import { SButton } from "../../Elements/SButton"
import {SingleTextInput} from "../../Elements/SingleTextInput"

type Props = {
  CreateRoom:()=>void
  SetRootID:(comment:string)=>void
}

export const RootLayout:FC<Props> = (props:Props)=>{
  const {CreateRoom, SetRootID} = props;

  const OnClick = ()=> CreateRoom()

  return(
    <div>
      <p>ようこそ</p>
      <p>新たに部屋を作成する場合は、新規作成をクリックしてください。</p>
      <SButton onClick={OnClick}>新規作成</SButton>
      <p>部屋IDをご存じの場合は、部屋IDを入力して入室を押してください。</p>
      <SingleTextInput title="部屋ID" SetText={SetRootID}>入室</SingleTextInput>
    </div>
  )
}
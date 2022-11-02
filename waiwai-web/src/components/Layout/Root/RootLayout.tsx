import { FC } from "react"
import { useAppDispatch } from '../../../store'

import { CreateRoom, getRoom } from '../../../store/room/reducer'

import { SButton } from "../../Elements/SButton"
import { SingleTextInput } from "../../Elements/SingleTextInput"

export const RootLayout: FC = () => {

  //イベント定義
  const dispatch = useAppDispatch()
  const OnClick = async () => {
    console.log("dispatch createNew　前")
    await dispatch(CreateRoom())
    console.log("dispatch createNew　後")
  }
  const OnInButtonClick = async (comment: string) => {
    await dispatch(getRoom(comment))
  }

  return (
    <div>
      <p>ようこそ</p>
      <p>新たに部屋を作成する場合は、新規作成をクリックしてください。</p>
      <SButton onClick={OnClick}>新規作成</SButton>
      <p>部屋IDをご存じの場合は、部屋IDを入力して入室を押してください。</p>
      <SingleTextInput title="部屋ID" SetText={OnInButtonClick}>入室</SingleTextInput>
    </div>
  )
}
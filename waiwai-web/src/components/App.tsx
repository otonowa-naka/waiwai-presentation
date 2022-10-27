import { FC, useState } from "react"
import { RootLayout } from "./Layout/Root/RootLayout"
import { RoomLayout } from "./Layout/Room/RoomLayout"
export const App:FC = ()=>
{
  // メインステータス
  const [roomId, SetRootID] = useState("")

  return(
    <div>
      <h1>ワイワイプレゼンテーション</h1>
      {
        roomId === "" ? <RootLayout CreateRoom={()=>{}} SetRootID={SetRootID}/>:<RoomLayout/>        
      }
    </div>
  )
}


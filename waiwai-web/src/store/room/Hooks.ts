import { useSelector } from '..'
import { RoomId } from './RoomId'
import { StampItem } from './Slice'

export const useRoomId = (): RoomId => {
    const roomid = useSelector((state) => state.roomState.room.id)
    return new RoomId(roomid)
}

export const useRoomTitle = (): string => {
    const title = useSelector((state) => state.roomState.room.title)
    return title
}

export const useStamp = (): StampItem[] => {
    const stamp = useSelector((state) => state.roomState.room.stamp)
    return stamp
}



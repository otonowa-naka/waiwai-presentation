import { useSelector } from '..'
import { RoomId } from './RoomId'

export const useRoomId = (): RoomId => {
    const roomid = useSelector((state) => state.room.room.id)
    return new RoomId(roomid)
}
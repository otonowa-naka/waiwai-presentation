export class RoomId {
    constructor(private key: string) {
        if (key.length > 20) {
            throw new Error(`文字数オーバー ${key.length.toString()}`)
        }
    }
    // 比較
    public equals(value: RoomId): boolean {
        return this.key === value.key
    }
}
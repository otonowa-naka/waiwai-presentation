export class RoomId {
    constructor(private key: string) {
        if (key.length !== 20) {
            throw new Error(`文字数が文字ではありません ${key.length.toString()}`)
        }

        if (key.match(/^[!-~]{20}$/) == null) {
            throw new Error('RoomIdにアスキー文字以外が入力させました')
        }
    }
    // 比較
    public equals(value: RoomId): boolean {
        return this.key === value.key
    }
}
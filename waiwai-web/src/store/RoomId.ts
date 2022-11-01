
export class RoomId {
    private constructor(private key: string) { }

    public static build(key: string): RoomId {
        if (key.length !== 20) {
            throw new Error(`文字数が文字ではありません ${key.length.toString()}`)
        }

        if (key.match(/^[!-~]{20}$/) == null) {
            throw new Error('RoomIdにアスキー文字以外が入力させました')
        }
        return new RoomId(key)
    }

    public static buildEmpty(): RoomId {
        return new RoomId("")
    }

    // 比較
    public equals(value: RoomId): boolean {
        return this.key === value.key
    }

    public IsEmpty() {
        return this.key === ""
    }
}

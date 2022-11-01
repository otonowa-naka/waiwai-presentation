

import { describe, expect, test } from '@jest/globals';
import { RoomId } from './RoomId';

const 正常系RoomID_A = '-NFS7TnM6uq0QaWUrRRv'
const 正常系RoomID_B = '-NFSPEOht-AEycIAN2Wo'

describe('コンストラクタ', () => {
  test('21文字以上の文字列を渡すと例外を返す', () => {
    expect(() => RoomId.build(正常系RoomID_A + "x")).toThrow()
  });

  test('アスキー文字以外は受け付けないこと', () => {
    expect(() => RoomId.build('-NFSPEOht-AEycIAN2Wｱ')).toThrow()
  });
});

describe('equals', () => {
  test('同じ場合はTrueを返す', () => {
    const left = RoomId.build(正常系RoomID_A)
    const rigth = RoomId.build(正常系RoomID_A)

    expect(left.equals(rigth)).toBeTruthy();
  });
  test('値が異なる場合はFalseを返す', () => {
    const left = RoomId.build(正常系RoomID_A)
    const rigth = RoomId.build(正常系RoomID_B)

    expect(left.equals(rigth)).toBeFalsy();
  });
});

describe('isEmpty', () => {
  test('有効な値の場合はFalseを返す', () => {
    const val = RoomId.build(正常系RoomID_A)
    expect(val.IsEmpty()).toBeFalsy()
  })

  test('無効な値の場合はTrueを返す', () => {
    const val = RoomId.buildEmpty()
    expect(val.IsEmpty()).toBeTruthy()
  })
});
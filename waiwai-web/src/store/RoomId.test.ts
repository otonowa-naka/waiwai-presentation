

import { describe, expect, test } from '@jest/globals';
import { RoomId } from './RoomId';

const 正常系RoomID_A = '-NFS7TnM6uq0QaWUrRRv'
const 正常系RoomID_B = '-NFSPEOht-AEycIAN2Wo'

describe('コンストラクタ', () => {
  test('21文字以上の文字列を渡すと例外を返す', () => {
    expect(() => new RoomId(正常系RoomID_A + "x")).toThrow()
  });
});

describe('equals', () => {
  test('同じ場合はTrueを返す', () => {
    const left = new RoomId(正常系RoomID_A)
    const rigth = new RoomId(正常系RoomID_A)

    expect(left.equals(rigth)).toBeTruthy();
  });
  test('値が異なる場合はFalseを返す', () => {
    const left = new RoomId(正常系RoomID_A)
    const rigth = new RoomId(正常系RoomID_B)

    expect(left.equals(rigth)).toBeFalsy();
  });
});
/**
 * Egg model
 * 나비!
 * @interface Egg
 * @property {number} id - 알의 id
 * @property {number} step - 현제 단계
 * @property {number} color - 나비 색
 * @property {number} currAry - 현제 활성화된 Art
 * @property {string} totalArt - 나비를 키울 때 기록한 Art
 */

export interface Egg {
  id: number;
  step: number;
  currAry: number;
  color: number;
  totalArt: string;
}

export const enum STEP {
  egg = 0,
  caterpillar = 1,
  pupa = 2,
  butterfly = 3,
}

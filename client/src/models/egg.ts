/**
 * Egg model
 * 나비!
 * @interface Egg
 * @property {number} id - 알의 id
 * @property {number | null} step - 현제 단계
 * @property {number} color - 나비 색
 * @property {number | null} currArt - 현제 활성화된 Art
 * @property {string | null} totalArt - 나비를 키울 때 기록한 Art
 */

export interface Egg {
  id: number;
  step: number | null;
  color: number;
  currArt: number | null;
  totalArt: string | null;
}

export const enum STEP {
  egg = 0,
  caterpillar = 1,
  pupa = 2,
  butterfly = 3,
}

/**
 * User model
 * 사용자 객체
 * @interface User
 * @property {string} username - 유저 닉네임
 * @property {number} currEgg - 현제 활성화된 Egg
 * @property {number[]} contains - 사용자가 보유 중인 Egg
 */

export interface User {
  username: string;
  currEgg: number;
  contains: number[];
}

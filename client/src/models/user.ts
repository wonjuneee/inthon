/**
 * User model
 * 사용자 객체
 * @interface User
 * @property {string} username - 유저 닉네임
 * @property {number | null} currEgg - 현제 활성화된 Egg
 * @property {number[] | null} contains - 사용자가 보유 중인 Egg
 */

export interface User {
  username: string;
  currEgg: number | null;
  contains: number[] | null;
}

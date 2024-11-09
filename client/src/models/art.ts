/**
 * Art model
 * 사용자가 입력한 기록
 * @interface Art
 * @property {number} id - 기록의 고유 id
 * @property {number} questionIdx - 질문 index (7은 performance로 연결)
 * @property {string | undefined} imagePath - 사용자가 업로드한 이미지 경로
 * @property {string | undefined} description - 사용자가 입력한 기록
 * @property {Date} createdAt - 기록이 생성된 날짜 (오늘 기록을 입력했는지 확인할 떄 사용)
 * @property {Date} updatedAt - 기록이 업데이트된 날짜
 */

export interface Art {
  id: number;
  questionIdx: number;
  imagePath: string | undefined;
  description: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

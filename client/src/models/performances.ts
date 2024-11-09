/**
 * Performance model
 * 사용자가 입력한 기록
 * @interface Performance
 * @property {string} eventId - 공연 id
 * @property {string} prfNm - 공연 이름
 * @property {Date} prfStart - 공연 시작 날짜
 * @property {Date} prfEnd - 공연 끝 날짜
 * @property {string} placeNm - 공연 장소 이름
 * @property {string} poster - 공연 포스터 img url
 * @property {string} genreNm - 공연 장르
 */

export interface Performance {
  eventId: number;
  prfNm: string;
  prfStart: Date;
  prfEnd: Date;
  placeNm: string;
  poster: string;
  genreNm: string;
}

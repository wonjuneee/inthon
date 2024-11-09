/**
 * Performance model
 * 사용자가 입력한 기록
 * @interface Performance
 * @property {string} eventId - 공연 id
 * @property {string} prfNm - 공연 이름
 * @property {Date | undefined} prfStart - 공연 시작 날짜
 * @property {Date | undefined} prfEnd - 공연 끝 날짜
 * @property {string | undefined} placeNm - 공연 장소 이름
 * @property {string} poster - 공연 포스터 img url
 * @property {string | undefined} genreNm - 공연 장르
 */

export interface Performance {
  eventId: number;
  prfNm: string;
  prfStart: Date | undefined;
  prfEnd: Date | undefined;
  placeNm: string | undefined;
  poster: string;
  genreNm: string | undefined;
}

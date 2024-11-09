export interface PerformanceGetAllResDto {
  eventId: string;
  prfNm: string;
  poster: string;
}

export interface PerformanceGetResDto {
  eventId: string;
  prfNm: string;
  prfStart: Date;
  prfEnd: Date;
  placeNm: string;
  poster: string;
  genreNm: string;
}

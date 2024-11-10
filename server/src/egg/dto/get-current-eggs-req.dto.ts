export class CurrentEggDto {
  id: number;
  step: number;
  color: number;
}

export class CurrentArtDto {
  id: number;
  questionIdx: number;
}

export class GetCurrentEggsResDto {
  egg: CurrentEggDto;
  art: CurrentArtDto;
}

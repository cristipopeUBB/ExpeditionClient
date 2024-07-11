export interface IPlanetInfoDto {
  imagePath: string | null;
  description: string | null;
  status: PlanetStatus;
  name: string | null;
  captain: string | null;
  robots: string | null;
}

export enum PlanetStatus {
  OK = 'OK',
  NOT_OK = '!OK',
  EN_ROUTE = 'En route',
  TO_DO = 'To Do'
}
import { PlanetStatus } from "./planet-info.dto";

export interface IUpdatePlanetInfoDto {
  description: string;
  status: PlanetStatus;
}
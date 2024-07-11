import { IPlanetInfoDto } from "./planet-info.dto";

export interface IExpeditionInfoDto {
  id: number;
  idCaptain: number;
  idPlanet: number;
  idShuttle: number;
  departureDate: Date | null;
}

export interface IExpeditionsDto {
  id: number;
  planetInfo : IPlanetInfoDto;
  captainName : string;
  robotsDetails : Array<string>;
  idCaptain: number;
  idPlanet: number;
  idShuttle: number;
  departureDate: Date | null;
}
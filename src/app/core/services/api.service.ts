import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IExpeditionInfoDto } from '../dtos/expedition-info.dto';
import { IPlanetInfoDto } from '../dtos/planet-info.dto';
import { IRobotInfoDto } from '../dtos/robot-info.dto';
import { ICaptainDto } from '../dtos/captain-info.dto';
import { IUpdatePlanetInfoDto } from '../dtos/update-planet-info.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string;

  private client : HttpClient = inject(HttpClient);

  constructor(@Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }

  getAllExpeditions(): Observable<IExpeditionInfoDto[]> {
    return this.client.get<IExpeditionInfoDto[]>(this.baseUrl + '/Expedition');
  }

  getPlanetById(id: number): Observable<IPlanetInfoDto> {
    return this.client.get<IPlanetInfoDto>(`${this.baseUrl}/Planet/${id}`);
  }

  getCaptainNameById(id: number): Observable<ICaptainDto> {
    return this.client.get<ICaptainDto>(`${this.baseUrl}/Human/${id}`);
  }

  getRobotsByExpeditionId(id: number): Observable<Array<IRobotInfoDto>> {
    return this.client.get<Array<IRobotInfoDto>>(`${this.baseUrl}/Robot/${id}`);
  }

  updatePlanetById(id: number, planet: IUpdatePlanetInfoDto): Observable<IPlanetInfoDto> {
    return this.client.put<IPlanetInfoDto>(`${this.baseUrl}/Planet/update/${id}`, planet);
  }
}
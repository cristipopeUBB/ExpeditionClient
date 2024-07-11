import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { IExpeditionsDto } from '../core/dtos/expedition-info.dto';
import { forkJoin, map } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {
  expeditions: IExpeditionsDto[] = [];

  private apiService: ApiService = inject(ApiService);
  private toastService: NgToastService = inject(NgToastService);

  showEditPlanetModal: boolean = false;
  selectedPlanetInfo: any = null;

  ngOnInit(): void {
    this.getAllExpeditions();
  }

  getAllExpeditions(): void {
    this.apiService.getAllExpeditions().subscribe({
      next: (expeditions) => {
        const requests = expeditions.map((expedition) =>
          forkJoin({
            planetInfo: this.apiService.getPlanetById(expedition.idPlanet),
            captainName: this.apiService.getCaptainNameById(expedition.idCaptain),
            robots: this.apiService.getRobotsByExpeditionId(expedition.id)
          }).pipe(
            map(({ planetInfo, captainName, robots }) => ({
              ...expedition,
              planetInfo,
              captainName: captainName.name,
              robotsDetails: robots.map((robot) => robot.name)
            }))
          )
        );

        forkJoin(requests).subscribe({
          next: (expeditions) => {
            this.expeditions = expeditions.map((element) => ({
              id: element.id,
              planetInfo: element.planetInfo,
              captainName: element.captainName,
              robotsDetails: element.robotsDetails,
              idCaptain: element.idCaptain,
              idPlanet: element.idPlanet,
              idShuttle: element.idShuttle,
              departureDate: element.departureDate
            }));
          },
          error: (error) => {
            this.toastService.danger(error, 'ERROR', 3000);
          },
          complete: () => {
            console.log('Expeditions loaded');
          }
        });
      },
      error: (error) => {
        console.error(error);
        this.toastService.danger(error, 'ERROR', 3000);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case '0':
        return 'status-ok';
      case '1':
        return 'status-not-ok';
      case '2':
        return 'status-to-do';
      case '3':
        return 'status-en-route';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case '0':
        return 'OK';
      case '1':
        return '!OK';
      case '2':
        return 'To Do';
      case '3':
        return 'En route';
      default:
        return '';
    }
  }

  openEditModal(planetInfo: any): void {
    this.selectedPlanetInfo = { ...planetInfo };
    this.showEditPlanetModal = true;
  }

  onSave(updatedPlanetInfo: any): void {
    updatedPlanetInfo.status = Number(updatedPlanetInfo.status);
    const expedition = this.expeditions.find((e) => e.idPlanet === updatedPlanetInfo.id);
    if (expedition) {
      expedition.planetInfo = updatedPlanetInfo;
    }

    this.apiService.updatePlanetById(updatedPlanetInfo.id, updatedPlanetInfo).subscribe({
      next: () => {
        this.toastService.success('Planet updated successfully!', 'SUCCESS', 3000);
        this.showEditPlanetModal = false;
      },
      error: (error) => {
        this.toastService.danger(error, 'ERROR', 3000);
        this.showEditPlanetModal = false;
      }
    });
  }

  onCancel(): void {
    this.showEditPlanetModal = false;
  }
}

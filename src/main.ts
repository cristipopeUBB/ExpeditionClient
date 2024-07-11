import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

const environment = {
  production: false,
  apiUrl: 'https://localhost:7078/api'
};

platformBrowserDynamic([
  { provide: 'API_URL', useValue: environment.apiUrl }
])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
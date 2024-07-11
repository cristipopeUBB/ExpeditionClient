import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './feed-page/feed-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'feed-page', pathMatch: 'full' },
  { path: 'feed-page', component: FeedPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

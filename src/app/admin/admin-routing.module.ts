import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AnnoncesComponent} from './annonces/annonces.component';
import {BlogsComponent} from './blogs/blogs.component';
import {SettingsComponent} from './settings/settings.component';
import {CreationsComponent} from './creations/creations.component';
import {ApplicationsComponent} from './applications/applications.component';

const routes: Routes = [
  {path: '', redirectTo: 'annonces', pathMatch: 'full'},
  {path: 'candidature', component: ApplicationsComponent},
  {path: 'annonces', component: AnnoncesComponent},
  {path: 'blog', component: BlogsComponent},
  {path: 'configuration', component: SettingsComponent},
  {path: 'creation', component: CreationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

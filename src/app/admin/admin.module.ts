import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnnoncesComponent} from './annonces/annonces.component';
import {BlogsComponent} from './blogs/blogs.component';
import {ProjetComponent} from './projet/projet.component';
import {AdminRoutingModule} from './admin-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {ShareModule} from '../share/share.module';
import {CreationsComponent} from './creations/creations.component';
import {QuillModule} from 'ngx-quill';
import {ReactiveFormsModule} from '@angular/forms';
import {ApplicationsComponent} from './applications/applications.component';

import * as moment from 'moment';

@NgModule({
  declarations: [
    AnnoncesComponent,
    BlogsComponent,
    ProjetComponent,
    SettingsComponent,
    CreationsComponent,
    ApplicationsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ShareModule,
    QuillModule.forRoot()
  ]
})
export class AdminModule {

  constructor() {
    moment.locale('fr');
  }

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './components/form/input/input.component';
import {ButtonComponent} from './components/button/button.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ActionCardComponent} from './components/action-card/action-card.component';
import {SelectComponent} from './components/form/select/select.component';
import {TagComponent} from './components/form/tag/tag.component';
import {SubstrPipe} from './pipe/substr.pipe';
import {CardComponent} from './components/card/card.component';
import {TextareaComponent} from './components/form/textarea/textarea.component';
import {AlertComponent} from './components/alert/alert.component';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    ActionCardComponent,
    SelectComponent,
    TagComponent,
    SubstrPipe,
    TextareaComponent,
    AlertComponent,
    CardComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    ActionCardComponent,
    SelectComponent,
    TagComponent,
    SubstrPipe,
    TextareaComponent,
    AlertComponent,
    CardComponent
  ],
  entryComponents: [
    AlertComponent
  ]
})
export class ShareModule {
}

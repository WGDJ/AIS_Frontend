import { HttpModule } from '@angular/http';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AlertModalService } from './services/alert-modal.service';

@NgModule({
  declarations: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    AlertModalComponent],
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    CampoControlErroComponent,
    ErrorMsgComponent,
    AlertModalComponent
  ],
  providers: [
    AlertModalService
  ],
  entryComponents: [AlertModalComponent]
})
export class SharedModule { }
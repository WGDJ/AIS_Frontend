import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GitHubRoutingModule } from './github-routing.module';
import { GitHubComponent } from './github.component';

@NgModule({
    imports: [CommonModule,
        GitHubRoutingModule,
        TableModule,
        ReactiveFormsModule,
        DialogModule,
        SharedModule,
        InputMaskModule,
        ConfirmDialogModule],
    declarations: [GitHubComponent]
})
export class GitHubModule { }

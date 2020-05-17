import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GitHubComponent } from './github.component';

const routes: Routes = [
  { path: '', component: GitHubComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GitHubRoutingModule { }

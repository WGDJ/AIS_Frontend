import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule'},
    { path: 'error', loadChildren: './shared/modules/server-error/server-error.module#ServerErrorModule' },
    { path: 'not-found', loadChildren: './shared/modules/not-found/not-found.module#NotFoundModule'},
    { path: '**', redirectTo: 'not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}

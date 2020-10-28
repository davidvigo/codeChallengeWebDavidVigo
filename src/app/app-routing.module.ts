import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./shared/guards/auth.guard";

const routes: Routes = [
    { path: 'login', loadChildren: './modules/auth/auth.module#AuthModule', canActivate: [AuthGuard]},
    { path: 'home', loadChildren: './modules/main/main.module#MainModule', canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

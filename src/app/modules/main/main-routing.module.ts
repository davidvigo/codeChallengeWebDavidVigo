import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from "./main/main.component";
import { TransactionsComponent } from "./main/transactions/transactions.component";

const authRoutes: Routes = [
    { path: '', redirectTo: 'transactions', pathMatch: 'full' }, // default UI is transactions
    { path: '', component: MainComponent, children: [{ path: 'transactions', component: TransactionsComponent }] },
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }

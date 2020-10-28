import { CdkTableModule } from "@angular/cdk/table";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../../shared/shared.module";
import { MainRoutingModule } from "./main-routing.module";
import { TransactionsComponent } from './main/transactions/transactions.component';
import { MainComponent } from './main/main.component';

@NgModule({
    declarations: [TransactionsComponent, MainComponent],
    exports: [TransactionsComponent],
    imports: [
        CommonModule,
        MainRoutingModule,
        FontAwesomeModule,
        SharedModule,
        TranslateModule,
        CdkTableModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MainModule { }

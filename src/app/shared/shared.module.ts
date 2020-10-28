import { CdkTableModule } from "@angular/cdk/table";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { CoreSpinnerComponent } from "./components/core-spinner/core-spinner.component";
import { CoreTableComponent } from "./components/core-table/core-table.component";
import { CoreAlertComponent } from './components/core-alert/core-alert.component';

@NgModule({
    declarations: [CoreSpinnerComponent, CoreTableComponent, CoreAlertComponent],
    exports: [CoreSpinnerComponent, CoreTableComponent, CoreAlertComponent],
    imports: [
        CommonModule,
        CdkTableModule,
        NgbAlertModule,
        TranslateModule,
        FontAwesomeModule
    ]
})
export class SharedModule { }

import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    mainSpinnerChannel = 'mainSpinnerChannel';

    constructor(private translateService: TranslateService) {
        this.translateService.addLangs(['en']);
        this.translateService.use('en');
    }
}

import { Component, Input } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
    selector: 'app-core-spinner',
    templateUrl: './core-spinner.component.html',
    styleUrls: ['./core-spinner.component.scss'],
})
export class CoreSpinnerComponent {
    @Input() channel: string;
    constructor(private spinnerService: SpinnerService) { }

    displaySpinner(): boolean {
        return !!this.spinnerService.getVisibility(this.channel);
    }
}

import { Component, Input } from '@angular/core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Alert, AlertsService } from "../../services/alerts.service";

@Component({
  selector: 'app-core-alert',
  templateUrl: './core-alert.component.html',
  styleUrls: ['./core-alert.component.scss']
})
export class CoreAlertComponent {
    @Input() channel: string;
    faClose = faTimes;

    constructor(private alertsService: AlertsService) { }

    getAlerts(): Alert[] {
        return this.alertsService.getAlerts(this.channel);
    }

    close(messageKey: string): void {
        this.alertsService.removeAlert(this.channel, messageKey);
    }
}

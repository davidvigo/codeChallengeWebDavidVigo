import { Injectable } from "@angular/core";

export interface Alert {
    type: string;
    closable: boolean;
    messageKey: string;
}

@Injectable({ providedIn: 'root' })
export class AlertsService {
    private displayAlerts: Map<string, Alert[]> = new Map<string, Alert[]>();

    closeAll(channel: string): void {
        this.displayAlerts.delete(channel);
    }

    getAlerts(channel: string): Alert[] {
        return this.displayAlerts.get(channel);
    }

    addAlert(channel: string, alert: Alert): void {
        const alertArray = this.displayAlerts.get(channel);
        if (!!alertArray) {
            this.displayAlerts.get(channel).push(alert);
        } else {
            this.displayAlerts.set(channel, [alert])
        }
    }

    removeAlert(channel: string, messageKey: string) {
        const alertArray = this.displayAlerts.get(channel);
        if (!!alertArray && !!alertArray.length) {
            const indexToRemove = alertArray.findIndex((alert: Alert) => alert.messageKey === messageKey);
            alertArray.splice(indexToRemove, 1);
        }
    }
}

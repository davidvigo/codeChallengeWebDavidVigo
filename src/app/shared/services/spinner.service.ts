import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
    private displaySpinners: Map<string, boolean> = new Map<string, boolean>();

    getVisibility(spinnerKey: string): boolean {
        return !!this.displaySpinners.get(spinnerKey);
    }

    showSpinner(spinnerKey?: string): void {
        this.displaySpinners.set(!!spinnerKey ? spinnerKey : 'mainSpinnerChannel', true);
    }

    hideSpinner(spinnerKey?: string): void {
        this.displaySpinners.set(!!spinnerKey ? spinnerKey : 'mainSpinnerChannel', false);
    }
}

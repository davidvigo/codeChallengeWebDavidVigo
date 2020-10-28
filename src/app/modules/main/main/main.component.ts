import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from "../../../shared/services/session.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    logoutIcon = faSignOutAlt;

    constructor(private router: Router) {}

    logout() {
        SessionService.finishSession();
        this.router.navigate(['/login']);
    }
}

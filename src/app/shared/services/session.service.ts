import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class SessionService {
    static startSession(token: string): void {
        localStorage.setItem('accessToken', token);
    }

    static getAccessToken(): string {
        return localStorage.getItem('accessToken');
    }

    static finishSession(): void  {
        localStorage.clear();
    }
}

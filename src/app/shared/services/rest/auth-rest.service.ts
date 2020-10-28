import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRequestDto } from "../../dto/authRequest.dto";
import { AuthResponseDto } from "../../dto/authResponse.dto";
import { getBaseUrl } from "../../functions/setBaseUrl.function";

@Injectable({ providedIn: 'root' })
export class AuthRestService {
    constructor(private http: HttpClient) { }

    login(authData: AuthRequestDto): Observable<HttpResponse<AuthResponseDto>> {
        return this.http.post<AuthResponseDto>(getBaseUrl('/token'), authData, {observe: "response" });
    }
}

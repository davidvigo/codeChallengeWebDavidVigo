import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TransactionDto } from "../../dto/transaction.dto";
import { getBaseUrl } from "../../functions/setBaseUrl.function";

@Injectable({ providedIn: 'root' })
export class TransactionsRestService {
    constructor(private http: HttpClient) {}

    get(sortOrder: string, description?: string): Observable<HttpResponse<TransactionDto[]>> {
        let params = new HttpParams();
        params = params.set('sort', sortOrder);
        if (!!description) {
            params = params.set('description', description);
        }
        return this.http.get<TransactionDto[]>(getBaseUrl('/transactions'), { observe: 'response', params });
    }
}

// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestModel } from '@models/request-model';
import { ApiResponse } from '@models/api-response.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private jsonHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  getData(params: RequestModel): Observable<ApiResponse> {
    const httpParams = Object.keys(params).reduce((accumulatedParams, key) => {
      const value = params[key as keyof RequestModel];
      return value !== undefined && value !== null
        ? accumulatedParams.set(key, value)
        : accumulatedParams;
    }, new HttpParams());

    return this.http.get<ApiResponse>(`${this.apiUrl}/get`, { params: httpParams });
  }

  postData(data: RequestModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/post`, data, { headers: this.jsonHeaders });
  }
}

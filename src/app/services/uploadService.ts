import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../models/environment';

@Injectable({
providedIn: 'root'})

export class UploadFileService {
  constructor(private http: HttpClient) { }

  pushFileToStorage(formData: FormData): Observable<any> {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = 'don';
    let password = 'don';
    const headers = new HttpHeaders(
      { 
        // 'Content-Type': "multipart/form-data",
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password)
      });
    return this.http.post(`${environment.baseUrl}/sendBulkMessages`,  formData, {headers: headers})
}}

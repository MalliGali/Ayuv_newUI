import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../models/environment';
import { SnowmedCode } from '../models/snowmedcode.model';

@Injectable({
  providedIn: 'root'
})
export class SnowmedService {
  browserRefresh: any;
  base_url = `${environment.baseUrl}`;
  
  constructor(private httpClient: HttpClient,
  ) { }

  getSnowmedCodes() {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get(`${environment.baseUrl}/getAllSnowMedCodes`, {headers: headersCreate});
  }

  getSnowmedCodeOne(snowmedCode: SnowmedCode) {
    let user_cuur = JSON.parse(localStorage.getItem('user'));
    let username = user_cuur.username;
    let password = user_cuur.password;

    const headersCreate = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get(`${environment.baseUrl}/getSnowMedCodeById/${snowmedCode.smcId}`, {headers: headersCreate});
  }
}

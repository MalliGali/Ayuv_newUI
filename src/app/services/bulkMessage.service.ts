import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { browserRefresh } from '../app.component';
import { Router } from '@angular/router';
import { environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class BulkMessageService implements OnInit {
  browserRefresh: any;
  base_url = `${environment.baseUrl}`;
    
  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(browserRefresh === true) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    } else if(JSON.parse(localStorage.getItem('user')).username === null) {
      localStorage.clear();
      sessionStorage.removeItem('username');
      this.router.navigate(['login']);
    }
  }

    getMsg() {
        let userOne = JSON.parse(localStorage.getItem('user'));
        let username = userOne.username;
        let password = userOne.password;
    
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
        return this.httpClient.get(`${this.base_url}/getAllMessageStatusByFile/${username}`,{headers});
    }

    getByFileName(fileId, status) {
      let userOne = JSON.parse(localStorage.getItem('user'));
      let username = userOne.username;
      let password = userOne.password;
  
      const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
      return this.httpClient.get(`${this.base_url}/getByFileName/${fileId}/${status}`,{headers});
    }
}
